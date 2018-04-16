package gr.athena.innovation.fagi.web.xml;

import gr.athena.innovation.fagi.web.model.config.Operator;
import gr.athena.innovation.fagi.web.model.config.Property;
import gr.athena.innovation.fagi.web.model.config.Query;
import gr.athena.innovation.fagi.web.model.config.Rule;
import gr.athena.innovation.fagi.web.model.config.RuleSet;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.model.config.ValidationRule;
import gr.athena.innovation.fagi.web.model.config.ValidationRules;
import gr.athena.innovation.fagi.web.model.config.Vocabulary;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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
        //System.out.println("writing xml to file..");
        //outter.output(doc, new FileWriter(new File("testXml.xml")));

    }

    private Element buildActionRule(ValidationRule rule) {
        
        Element actionRuleElement = new Element(Vocabulary.ACTION_RULE);
            Element actionElement = new Element(Vocabulary.ACTION);
            
            actionElement.addContent(rule.getValidationAction());
            actionRuleElement.addContent(actionElement);
        
            Element conditionElement = new Element(Vocabulary.CONDITION);

            Query query = rule.getQuery();
            String combinator = query.getCombinator();
            Operator operator = query.getOperator();
        
        if(combinator == null || combinator.equals(Vocabulary.NONE)){
            //single fuction
//            String dataset = operator.getDataset();
//            Property propA = operator.getPropA();
//            Property propB = operator.getPropB();
//            double threshold = operator.getThreshold();
            
            //Element 
            
        } else if(combinator.equals(Vocabulary.NOT)) {
            //should be single function or two nested combinators
            if(query.getRules().size() == 1){
                
                Query f = query.getRules().get(0);
                f.getField();
                f.getOperator().getDataset();
                f.getOperator().getPropA();
                f.getOperator().getPropB();
                f.getOperator().getThreshold();
                
            }
        }
        
        
        

        
        return actionRuleElement;
    }

    private void getAllProperties(ValidationRule rule) {
        
        
        Operator op = rule.getQuery().getOperator();
        String combinator = rule.getQuery().getCombinator();
        
        if(op != null){
            
            String field = rule.getQuery().getField();
            
            
            if(op.getDataset() == null){
                //get both properties
            } else {
                
            }
            
            Property propA = op.getPropA();
            
            Property propB = op.getPropB();
            
            
        } else if(combinator != null){
            
        }
        
    }
    
    
}
