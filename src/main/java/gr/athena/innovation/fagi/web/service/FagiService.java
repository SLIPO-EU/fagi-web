package gr.athena.innovation.fagi.web.service;

import gr.athena.innovation.fagi.Fagi;
import gr.athena.innovation.fagi.FagiInstance;
import gr.athena.innovation.fagi.exception.WrongInputException;
import gr.athena.innovation.fagi.web.controller.FusionController;
import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.FagiOntology;
import gr.athena.innovation.fagi.web.model.OntologyProperty;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.xml.XMLBuilder;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.commons.collections4.MultiValuedMap;
import org.apache.commons.collections4.multimap.ArrayListValuedHashMap;
import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.ObjectProperty;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.ontology.OntResource;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

/**
 *
 * @author nkarag
 */
@Service
public class FagiService implements IService{

    @Override
    public boolean validateConfig(RulesConfigRequest configuration) {
        XMLBuilder xmlBuilder = new XMLBuilder();
        boolean isValid = xmlBuilder.validateConfig(configuration);
        return isValid;
    }

    @Override
    public String constructConfig(String dirPath, RulesConfigRequest configuration) {

        try {
            XMLBuilder xmlBuilder = new XMLBuilder();
            
            //todo: get uploaded config and add rules path to it.
            String configPath = xmlBuilder.writeRulesToXML(dirPath, configuration);

            return configPath;
        } catch (IOException ex) {
            Logger.getLogger(FusionController.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }

    @Override
    public void fuse(String configPath) throws ApplicationException{
        
        String[] fagiArgs = {"-spec", configPath};
        try {
            Fagi.main(fagiArgs);
        } catch(Exception ex){
            throw new ApplicationException(ex.getLocalizedMessage());
        }
    }

    @Override
    public String getNewDirectoryPath() throws ApplicationException{
        
        Path currentRelativePath = Paths.get("");
        String path = currentRelativePath.toAbsolutePath().toString();
        UUID uuid = UUID.randomUUID();
        
        String directoryPath = path + "/temp/" + uuid;
        
        boolean success = new File(directoryPath).mkdirs();
        
        if(!success){
            System.out.println("Could not create directory: " + directoryPath);
            throw new ApplicationException("Could not create directory: " + directoryPath);
        }

        return directoryPath;
    }

    @Override
    public String getStatistics(String path, List<String> statistics) throws ApplicationException, 
            WrongInputException, ParserConfigurationException, SAXException, IOException, ParseException {
        
        FagiInstance fagi = new FagiInstance(path);
        
        return fagi.computeStatistics(statistics);
    }

    @Override
    public FagiOntology getOntology(String ontologyText) {
        File temp = null;
        try {
            temp = File.createTempFile("ontologyTemp", ".owl");
        } catch (IOException ex) {
            if(temp != null){
                temp.delete();
            }
            throw new ApplicationException(ex.getMessage());
        }

        try (PrintWriter pw = new PrintWriter(temp)) {
            pw.write(ontologyText);
        } catch (FileNotFoundException ex) {
            if(temp != null){
                temp.delete();
            }
            throw new ApplicationException(ex.getMessage());
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
                rangesToObjectProperties.put(range.toString(), objectProperty.toString());
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
        
        FagiOntology ontology = new FagiOntology();
        ontology.setNumberOfClasses(model.listClasses().toList().size());
        ontology.setProperties(properties);
        
        temp.delete();
        
        return ontology;
    }
}
