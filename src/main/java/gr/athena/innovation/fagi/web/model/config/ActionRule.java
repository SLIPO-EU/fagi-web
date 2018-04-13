package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class ActionRule {
    private int id;
    private String fusionAction;
    private Query query;

    public int getId() {
        return id;
    }

    public Query getQuery() {
        return query;
    }

    public String getFusionAction() {
        return fusionAction;
    }
}
