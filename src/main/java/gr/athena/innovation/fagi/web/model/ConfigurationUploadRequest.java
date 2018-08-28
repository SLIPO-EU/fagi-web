package gr.athena.innovation.fagi.web.model;

/**
 *
 * @author nkarag
 */
public class ConfigurationUploadRequest {
    
    private String name;
    private String configuration;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }
}
