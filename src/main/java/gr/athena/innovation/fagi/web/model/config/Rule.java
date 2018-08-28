package gr.athena.innovation.fagi.web.model.config;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author nkarag
 */
public class Rule {
    
    private int id;
    private List<ActionRule> actionRules;
    private String fusionPropertyA;
    private String fusionPropertyB;
    private String defaultRuleAction;

    public int getId() {
        return id;
    }

    public List<ActionRule> getActionRules() {
        if(actionRules == null){
            return new ArrayList<>();
        }
        return actionRules;
    }

    public String getFusionPropertyA() {
        return fusionPropertyA;
    }

    public String getFusionPropertyB() {
        return fusionPropertyB;
    }

    public String getDefaultRuleAction() {
        return defaultRuleAction;
    }
}
