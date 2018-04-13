package gr.athena.innovation.fagi.web.model.config;

import java.util.List;

/**
 *
 * @author nkarag
 */
public class ValidationRules {
    
    private String defaultValidationAction;
    private List<ValidationRule> rules;

    public String getDefaultValidationAction() {
        return defaultValidationAction;
    }

    public List<ValidationRule> getRules() {
        return rules;
    }
}
