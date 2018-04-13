package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class RulesConfigRequest {
    
    private String datasetAction;
    private ValidationRules validationRules;
    private RuleSet ruleset;
    
    public String getDatasetAction() {
        return datasetAction;
    }
    
    public ValidationRules getValidationRules() {
        return validationRules;
    }

    public RuleSet getRuleset() {
        return ruleset;
    }
}
