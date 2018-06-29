package gr.athena.innovation.fagi.web.model;

import java.util.List;


/**
 *
 * @author nkarag
 */
public class OntologyResponse extends RestResponse {
    private List<OntologyProperty> properties; 

    public List<OntologyProperty> getProperties() {
        return properties;
    }

    public void setProperties(List<OntologyProperty> properties) {
        this.properties = properties;
    }
}
