package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class ValidationRule {
    private int id;
    private String validationAction;
    private Query query;

    public int getId() {
        return id;
    }

    public Query getQuery() {
        return query;
    }

    public String getValidationAction() {
        return validationAction;
    }    
}
