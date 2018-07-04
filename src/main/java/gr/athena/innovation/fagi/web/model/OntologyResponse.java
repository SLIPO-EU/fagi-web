package gr.athena.innovation.fagi.web.model;

/**
 *
 * @author nkarag
 */
public class OntologyResponse extends RestResponse {
    
    private FagiOntology ontology; 

    public FagiOntology getOntology() {
        return ontology;
    }

    public void setOntology(FagiOntology ontology) {
        this.ontology = ontology;
    }
}
