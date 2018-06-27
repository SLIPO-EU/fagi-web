package gr.athena.innovation.fagi.web.model;

import java.util.List;


/**
 *
 * @author nkarag
 */
public class OntologyResponse extends RestResponse {
    private List<String> properties;

    public List<String> getProperties() {
        return properties;
    }

    public void setProperties(List<String> properties) {
        this.properties = properties;
    }
    
}
