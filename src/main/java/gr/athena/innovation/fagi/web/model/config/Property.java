package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class Property {
    private boolean disabled;
    private String key;
    private String type;
    private String label;
    private String value;

    public boolean isDisabled() {
        return disabled;
    }

    public String getKey() {
        return key;
    }

    public String getType() {
        return type;
    }

    public String getLabel() {
        return label;
    }

    public String getValue() {
        return value;
    }
}
