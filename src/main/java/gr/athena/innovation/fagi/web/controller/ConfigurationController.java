package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.model.OntologyProperty;
import gr.athena.innovation.fagi.web.model.OntologyResponse;
import gr.athena.innovation.fagi.web.model.RestResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.collections4.MultiValuedMap;
import org.apache.commons.collections4.multimap.ArrayListValuedHashMap;
import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.ObjectProperty;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.ontology.OntResource;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author nkarag
 */
@Controller
public class ConfigurationController {
    
    @RequestMapping(value = "/action/upload", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse upload(@RequestBody String ontologyText) throws FileNotFoundException, IOException {

        File temp = File.createTempFile("ontologyTemp", ".owl");

        try (PrintWriter pw = new PrintWriter(temp)) {
            pw.write(ontologyText);
        }
        
        OntModel model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM_RDFS_INF);
        model.read(temp.getAbsolutePath());

        //get all datatype properties (e.g. should contain #nameValue).
        //for each datatype property get the domain (e.g should be #Name for #nameValue)
        Map<String, String> datatypePropertiesToDomains = new HashMap<>();
        ExtendedIterator<DatatypeProperty> datatypeProperties = model.listDatatypeProperties();
        while(datatypeProperties.hasNext()){
            DatatypeProperty datatypeProperty = datatypeProperties.next();
            if(datatypeProperty != null){
                OntResource domain = datatypeProperty.getDomain();
                if(domain != null){
                    datatypePropertiesToDomains.put(datatypeProperty.toString(), domain.toString());
                }
            }
        }
        
        //get all objectProperties (should contain #name)
        //for each object property, get the range (e.g. should be #Name for #name object property)
        //match with above.
        MultiValuedMap<String, String> rangesToObjectProperties = new ArrayListValuedHashMap();
        ExtendedIterator<ObjectProperty> objectProperties = model.listObjectProperties();
        while(objectProperties.hasNext()){
            ObjectProperty objectProperty = objectProperties.next();
            OntResource range = objectProperty.getRange();
            if(range != null ){
                rangesToObjectProperties.put(range.toString(),objectProperty.toString());
            }
            //<#Name> <#name>
        }

        List<OntologyProperty> properties = new ArrayList<>();
        for(Map.Entry<String, String> entry : datatypePropertiesToDomains.entrySet()){
            String domain = entry.getValue();

            Collection<String> range = rangesToObjectProperties.get(domain);
            for(String objectProperty : range){
                String datatypeProperty = entry.getKey();
                
                OntologyProperty property = new OntologyProperty();
                property.setObjectProperty(objectProperty);
                property.setDatatypeProperty(datatypeProperty);

                properties.add(property);
            }
        }
        
        try{

            OntologyResponse response = new OntologyResponse();
            response.setProperties(properties);

            temp.delete();
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            temp.delete();
            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }        
}
