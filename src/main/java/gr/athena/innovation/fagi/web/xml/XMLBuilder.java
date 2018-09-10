package gr.athena.innovation.fagi.web.xml;

import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.config.ActionRule;
import gr.athena.innovation.fagi.web.model.config.Operator;
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
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

/**
 * Takes the config java object and produces the 'rules' XML file used as input in FAGI. 
 * 
 * @author nkarag
 */
public class XMLBuilder {
    
    private static final Logger LOG = LogManager.getLogger(XMLBuilder.class);
    
    private final List<Element> externalProperties = new ArrayList<>();
    private Integer numIndex = 0;
    
    public boolean validateConfig(RulesConfigRequest config){
        if(StringUtils.isBlank(config.getDatasetAction())){
            return false;
        }

        return !config.getRuleset().getRules().isEmpty();
    }

    public String writeRulesToXML(String dirPath, RulesConfigRequest config) throws IOException {

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

            //<actionRuleSet>
            Element actionRulesetElement = new Element(Vocabulary.ACTION_RULE_SET);
                
            for(ValidationRule actionRule : validation.getRules()){
                //<actionRule>
                Element actionRuleElement = buildValidationRule(actionRule);
                actionRulesetElement.addContent(actionRuleElement);
            }
                
            validationRuleElement.addContent(actionRulesetElement);
        
            //<externalProperty>
            for(Element p : externalProperties){
                validationRuleElement.addContent(p);
            }
            
        rulesElement.addContent(validationRuleElement);
                    
        

        /*Fusion Rules*/
        RuleSet ruleset = config.getRuleset();
        for(Rule rule : ruleset.getRules()){
            externalProperties.clear();
            Element ruleElement = new Element(Vocabulary.RULE);
            
            /*fusion properties */
            Element fusionPropertyAElement = new Element(Vocabulary.PROPERTY_A);
            Element fusionPropertyBElement = new Element(Vocabulary.PROPERTY_B);
            fusionPropertyAElement.addContent(rule.getFusionPropertyA());
            fusionPropertyBElement.addContent(rule.getFusionPropertyB());
            
            ruleElement.addContent(fusionPropertyAElement);
            ruleElement.addContent(fusionPropertyBElement);
            
            /* default fusion action */
            String defaultRuleAction = rule.getDefaultRuleAction();
            Element defaultRuleActionElement = new Element(Vocabulary.DEFAULT_ACTION);
            defaultRuleActionElement.addContent(defaultRuleAction);
            ruleElement.addContent(defaultRuleActionElement);
            
            /* action rules (conditions) */
            List<ActionRule> actionRules = rule.getActionRules();
            LOG.info("action rules size: " + actionRules);
            
            Element actionRulesetElement2 = new Element(Vocabulary.ACTION_RULE_SET);
                
            for(ActionRule actionRule : actionRules){
                //<actionRule>
                Element actionRuleElement = buildActionRule(actionRule);
                actionRulesetElement2.addContent(actionRuleElement);
            }

            ruleElement.addContent(actionRulesetElement2);

            for(Element p : externalProperties){
                ruleElement.addContent(p);
            }

            rulesElement.addContent(ruleElement);
        }

        rulesElement.addContent(defaultDatasetAction);

        doc.setRootElement(rulesElement);

        XMLOutputter outputter = new XMLOutputter();
        outputter.setFormat(Format.getPrettyFormat());
        
        File file = new File(dirPath + "/rules.xml");
        file.createNewFile();
        
        LOG.info("writing xml to file.. (" + file.getAbsolutePath() + ").");

        outputter.output(doc, new FileWriter(file));
        
        return file.getAbsolutePath();

    }

    private Element buildValidationRule(ValidationRule rule) {
        
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
                        conditionElement.addContent(functionElement);
                    } else {
                        throw new ApplicationException("None operator should have a single function. Found: " 
                                + query.getRules().size());
                    }

                } else if(combinator.equals(Vocabulary.NOT)) {
                    
                    Element notElement = new Element(Vocabulary.NOT);
                    
                    //should be single function or two nested combinators
                    if(query.getRules().size() == 1){
                        //single function or single epxression
                        if(containsNested(query)){
                            String comb = query.getRules().get(0).getCombinator();
                            Element combElement = buildNestedExpression(comb, query);
                            notElement.addContent(combElement);                                
                        } else {
                            //single function
                            Element functionElement = buildFunction(query, 0);
                            notElement.addContent(functionElement);                            
                        }

                    } else if(query.getRules().size() > 1){

                        Element andElement = buildCombinatorElement(Vocabulary.AND, query);
                        notElement.addContent(andElement);                        
                        
                    } else {
                        throw new ApplicationException("'NOT' operator does not contain any expressions or function");
                    }
                    
                    expressionElement.addContent(notElement);
                    conditionElement.addContent(expressionElement);
                } else if(combinator.equals(Vocabulary.AND)){

                    Element andElement = buildCombinatorElement(Vocabulary.AND, query);
                    expressionElement.addContent(andElement);
                    conditionElement.addContent(expressionElement);
                } else if(combinator.equals(Vocabulary.OR)){
                    
                    Element orElement = buildCombinatorElement(Vocabulary.OR, query); 
                    expressionElement.addContent(orElement);
                    conditionElement.addContent(expressionElement);
                }

            actionRuleElement.addContent(conditionElement);
        
        return actionRuleElement;
    }

    private Element buildActionRule(ActionRule rule) {
        
        Element actionRuleElement = new Element(Vocabulary.ACTION_RULE);
            Element actionElement = new Element(Vocabulary.ACTION);
            
            actionElement.addContent(rule.getFusionAction());
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
                        conditionElement.addContent(functionElement);
                    } else {
                        throw new ApplicationException("None operator should have a single function. Found: " 
                                + query.getRules().size());
                    }

                } else if(combinator.equals(Vocabulary.NOT)) {
                    
                    Element notElement = new Element(Vocabulary.NOT);
                    
                    //should be single function or two nested combinators
                    if(query.getRules().size() == 1){
                        //single function or single epxression
                        if(containsNested(query)){
                            String comb = query.getRules().get(0).getCombinator();
                            Element combElement = buildNestedExpression(comb, query);
                            notElement.addContent(combElement);                                
                        } else {
                            //single function
                            Element functionElement = buildFunction(query, 0);
                            notElement.addContent(functionElement);                            
                        }

                    } else if(query.getRules().size() > 1){

                        Element andElement = buildCombinatorElement(Vocabulary.AND, query);
                        notElement.addContent(andElement);                        
                        
                    } else {
                        throw new ApplicationException("'NOT' operator does not contain any expressions or function");
                    }
                    
                    expressionElement.addContent(notElement);
                    conditionElement.addContent(expressionElement);
                    
                } else if(combinator.equals(Vocabulary.AND)){

                    Element andElement = buildCombinatorElement(Vocabulary.AND, query);
                    expressionElement.addContent(andElement);
                    conditionElement.addContent(expressionElement);
                    
                } else if(combinator.equals(Vocabulary.OR)){
                    
                    Element orElement = buildCombinatorElement(Vocabulary.OR, query); 
                    expressionElement.addContent(orElement);
                    conditionElement.addContent(expressionElement);
                }

            actionRuleElement.addContent(conditionElement);
        
        return actionRuleElement;
    }
    
    private Element buildCombinatorElement(String combinator, Query query) throws ApplicationException {
        Element combinatorElement = new Element(combinator);
        
        //Combinator expression contains more expressions. Iterate with 'buildNestedExpression' and build all expressions.
        if(containsNested(query)){

            if(query.getRules().get(0).getCombinator() == null){
                throw new ApplicationException("Fail with nested expression, null child combinator.");
            } else {
                String comb = query.getRules().get(0).getCombinator();//only one nested combinator allowed.
                
                Element nestedElement = buildNestedExpression(comb, query);
                combinatorElement.addContent(nestedElement);
            }
            
        } else { //Combinator expression contains simple functions. Iterate with 'buildFunction' and build all functions

            for(int i=0; i< query.getRules().size(); i++){
                Element functionElement = buildFunction(query, i);
                combinatorElement.addContent(functionElement);
            }
        }

        return combinatorElement;
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
                    function = field + "(" + vars.getVarA() + ")"; //only A variable is defined from UI
                } else {
                    LOG.info("Operator contains malformed dataset: " + parentOperator.getDataset());
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

        PropertyVariablePair vars = new PropertyVariablePair();
        
        Element propertyA = new Element(Vocabulary.EXTERNAL_PROPERTY);
        Element propertyB = new Element(Vocabulary.EXTERNAL_PROPERTY);
        
        String variableA = Vocabulary.A + numIndex.toString();
        vars.setVarA(variableA);
        
        String variableB = Vocabulary.B + numIndex.toString();
        vars.setVarB(variableB);
        
        propertyA.setAttribute(Vocabulary.ID, variableA);
        propertyA.addContent(propertyValueA);
        
        propertyB.setAttribute(Vocabulary.ID, variableB);
        propertyB.addContent(propertyValueB);        
        
        externalProperties.add(propertyA);
        externalProperties.add(propertyB);
        
        numIndex++;
        
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
