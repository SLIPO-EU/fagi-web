package gr.athena.innovation.fagi.web.model;

/**
 *
 * @author nkarag
 */
public class OntologyProperty {

    private String objectProperty;

    @Override
    public String toString() {
        return "OntologyProperty{" + "objectProperty=" + objectProperty + ", datatypeProperty=" + datatypeProperty + '}';
    }
    private String datatypeProperty;

    public String getObjectProperty() {
        return objectProperty;
    }

    public void setObjectProperty(String objectProperty) {
        this.objectProperty = objectProperty;
    }

    public String getDatatypeProperty() {
        return datatypeProperty;
    }

    public void setDatatypeProperty(String datatypeProperty) {
        this.datatypeProperty = datatypeProperty;
    }

}
