package gr.athena.innovation.fagi.web.model;

import java.util.List;

/**
 * Class containing data related to an ontology. 
 * 
 * @author nkarag
 */
public class FagiOntology {

    private List<OntologyProperty> properties; 
    private int numberOfClasses;

    public List<OntologyProperty> getProperties() {
        return properties;
    }

    public void setProperties(List<OntologyProperty> properties) {
        this.properties = properties;
    }

    public int getNumberOfClasses() {
        return numberOfClasses;
    }

    public void setNumberOfClasses(int numberOfClasses) {
        this.numberOfClasses = numberOfClasses;
    }    
}
