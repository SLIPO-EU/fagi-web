package gr.athena.innovation.fagi.web.xml;

import exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.config.Operator;
import gr.athena.innovation.fagi.web.model.config.Property;
import gr.athena.innovation.fagi.web.model.config.Query;
import gr.athena.innovation.fagi.web.model.config.Rule;
import gr.athena.innovation.fagi.web.model.config.RuleSet;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.model.config.ValidationRule;
import gr.athena.innovation.fagi.web.model.config.ValidationRules;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

/**
 *
 * @author nkarag
 */
public class XMLBuilder {
    
    private List<Element> validationExternalProperties = new ArrayList<>();
    private Integer numIndex = 0;
    private Integer alphabetIndex = 0;
    
    public void writeRulesToXML(RulesConfigRequest config) throws IOException {

        Element rulesElement = new Element("rules");
        Document doc = new Document();

        Element defaultDatasetAction = new Element(Vocabulary.DEFAULT_DATASET_ACTION);
        defaultDatasetAction.addContent(config.getDatasetAction());

        /*Validation Rules*/
         
        //<validationRule>
        Element validationRuleElement = new Element(Vocabulary.VALIDATION_RULE);
            //<defaultAction>
            ValidationRules validation = config.getValidationRules();
            String defaultAction = validation.getDefaultValidationAction();
            Element defaultActionElement = new Element(Vocabulary.DEFAULT_ACTION);
            defaultActionElement.addContent(defaultAction);
            validationRuleElement.addContent(defaultActionElement);
            
            //<externalProperty>

            //<actionRuleSet>
            Element actionRulesetElement = new Element(Vocabulary.ACTION_RULE_SET);
                
                
                for(ValidationRule actionRule : validation.getRules()){
                    //<actionRule>
                    Element actionRuleElement = buildActionRule(actionRule);
                    actionRulesetElement.addContent(actionRuleElement);
                }
                
            validationRuleElement.addContent(actionRulesetElement);
        
            for(Element p : validationExternalProperties){
                validationRuleElement.addContent(p);
            }
            
        rulesElement.addContent(validationRuleElement);
                    
        /*Fusion Rules*/
        RuleSet ruleset = config.getRuleset();
//        for(Rule rule : ruleset.getRules()){
//            Element rule = new Element("rule");
//            //rule.
//        }

        rulesElement.addContent(defaultDatasetAction);
        //rulesElement.addContent(rulesElement)
        //root.addContent(validationRules);
        //root.addContent(child3);


        doc.setRootElement(rulesElement);

        XMLOutputter outter = new XMLOutputter();
        outter.setFormat(Format.getPrettyFormat());
        System.out.println("writing xml to file..");
        outter.output(doc, new FileWriter(new File("/home/nkarag/Documents/SLIPO/testXml.xml")));

    }

    private Element buildActionRule(ValidationRule rule) {
        
        Element actionRuleElement = new Element(Vocabulary.ACTION_RULE);
            Element actionElement = new Element(Vocabulary.ACTION);
            
            actionElement.addContent(rule.getValidationAction());
            actionRuleElement.addContent(actionElement);
        
            //<condition>
            Element conditionElement = new Element(Vocabulary.CONDITION);
                //<expression>
                Element expressionElement = new Element(Vocabulary.EXPRESSION);

                Query query = rule.getQuery();
                
                String combinator = query.getCombinator();
                //Operator operator = query.getOperator();
        
                if(combinator == null || combinator.equals(Vocabulary.NONE)){
                    //single fuction
                    if(query.getRules().size() == 1){
                        Element functionElement = buildFunction(query, 0);
                        expressionElement.addContent(functionElement);
                    } else {
                        throw new ApplicationException("None operator should have a single function. Found: " 
                                + query.getRules().size());
                    }

                } else if(combinator.equals(Vocabulary.NOT)) {
                    
                    Element notElement = new Element(Vocabulary.NOT);
                    
                    //should be single function or two nested combinators
                    if(query.getRules().size() == 1){
                        //single function:
                        Element functionElement = buildFunction(query, 0);

                        notElement.addContent(functionElement);
                        
                    } else if(query.getRules().size() > 1){
                        //TODO
                        //nested
                        
                    } else {
                        throw new ApplicationException("'NOT' operator does not contain any expressions or function");
                    }
                    
                    expressionElement.addContent(notElement);
                    
                } else if(combinator.equals(Vocabulary.AND)){

                    buildCombinatorElement(Vocabulary.AND, query, expressionElement);
                    
                } else if(combinator.equals(Vocabulary.OR)){
                    
                    buildCombinatorElement(Vocabulary.OR, query, expressionElement);                    
                }
        
                conditionElement.addContent(expressionElement);

            actionRuleElement.addContent(conditionElement);
        
        return actionRuleElement;
    }

    private void buildCombinatorElement(String combinator, Query query, Element expressionElement) throws ApplicationException {
        Element andElement = new Element(combinator);
        
        //And expression contains more expressions. Iterate and build all expressions.
        if(containsNested(query)){
            if(query.getRules().get(0).getCombinator() == null){
                throw new ApplicationException("Fail with nested expression, null child combinator.");
            } else {
                String comb = query.getRules().get(0).getCombinator();//only one nested combinator allowed.
                
                Element nestedElement = buildNestedExpression(comb, query);
                andElement.addContent(nestedElement);
            }
            
        } else { //AND expression contains simple functions. Iterate and build all functions
            
            for(int i=0; i< query.getRules().size(); i++){
                Element functionElement = buildFunction(query, i);
                andElement.addContent(functionElement);
            }
        }
        
        expressionElement.addContent(andElement);
    }

    private Element buildNestedExpression(String combinator, Query query){
        Element expressionElement = new Element(Vocabulary.EXPRESSION);
        Element combinatorElement = new Element(combinator);
        
        Query child = query.getRules().get(0);//1 nested expression allowed.
        for(int i=0; i< child.getRules().size(); i++){
            Element functionElement = buildFunction(child, i);
            combinatorElement.addContent(functionElement);
        }
        
        expressionElement.addContent(combinatorElement);

        return expressionElement;
    }
    
    private Element buildFunction(Query query, int index) throws ApplicationException {
        Operator parentOperator = query.getOperator();
        Element functionElement = new Element(Vocabulary.FUNCTION);

        Query q = query.getRules().get(index);
        Operator op = q.getOperator();
        String field = q.getField();

        String propA = op.getPropA().getValue();
        String propB = op.getPropB().getValue();
        
        PropertyVariablePair vars = addExternalPropertyPair(propA, propB);
        String function;
        
        Integer paramCount = Vocabulary.functionParameters.get(field);
        
        switch (paramCount) {
            case 1:
                if(op.getDataset().equals(Vocabulary.LEFT)){
                    function = field + "(" + vars.getVarA() + ")";
                } else if(op.getDataset().equals(Vocabulary.RIGHT)){
                    function = field + "(" + vars.getVarB() + ")";
                } else {
                    System.out.println("Operator contains malformed dataset: " + parentOperator.getDataset());
                    throw new ApplicationException("Operator contains malformed dataset: "
                            + parentOperator.getDataset());
                }
                break;
            case 2:
                function = field + "(" + vars.getVarA() + Vocabulary.COMMA + vars.getVarB() + ")";
                break;
                
            case 3:
                Double thres = op.getThreshold();
                function = field + "(" + vars.getVarA() + Vocabulary.COMMA + vars.getVarB()
                        + Vocabulary.COMMA + thres + ")";
                break;
            default:
                throw new ApplicationException("Invalid parameter count: " + paramCount);
        }
        
        functionElement.addContent(function);
        
        return functionElement;
        
    }

    private PropertyVariablePair addExternalPropertyPair(String propertyValueA, String propertyValueB){
        
        if(alphabetIndex > Vocabulary.ALPHABET.length){
            throw new ApplicationException("Too many external properties, we ran out of alphabet characters");
        }
        
        PropertyVariablePair vars = new PropertyVariablePair();
        
        Element propertyA = new Element(Vocabulary.EXTERNAL_PROPERTY);
        Element propertyB = new Element(Vocabulary.EXTERNAL_PROPERTY);
        
        String variableA = Vocabulary.ALPHABET[alphabetIndex] + numIndex.toString();
        vars.setVarA(variableA);
        
        alphabetIndex++;
        
        String variableB = Vocabulary.ALPHABET[alphabetIndex] + numIndex.toString();
        vars.setVarB(variableB);
        
        propertyA.setAttribute(Vocabulary.ID, variableA);
        propertyA.addContent(propertyValueA);
        
        propertyB.setAttribute(Vocabulary.ID, variableB);
        propertyB.addContent(propertyValueB);        
        
        validationExternalProperties.add(propertyA);
        validationExternalProperties.add(propertyB);
        
        numIndex++;
        alphabetIndex++;
        
        return vars;
    }

    private boolean containsNested(Query query){
        List<Query> rules = query.getRules();
        if(rules != null && !rules.isEmpty()){
            List<Query> childRules = rules.get(0).getRules();
            if(childRules != null && !childRules.isEmpty()){
                return true;
            }
        }
        return false;     
    }
}
