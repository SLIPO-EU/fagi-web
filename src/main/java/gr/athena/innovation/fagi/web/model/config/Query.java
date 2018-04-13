package gr.athena.innovation.fagi.web.model.config;

import java.util.List;

/**
 *
 * @author nkarag
 */
public class Query {
    private String id;
    //private EnumCombinator combinator;
    private String combinator;
    private List<Query> rules;
    

    private String field;
    private Operator operator;

    public String getId() {
        return id;
    }

    public String getCombinator() {
        return combinator;
    }

    public List<Query> getRules() {
        return rules;
    }

    public String getField() {
        return field;
    }

    public Operator getOperator() {
        return operator;
    }
    
}
