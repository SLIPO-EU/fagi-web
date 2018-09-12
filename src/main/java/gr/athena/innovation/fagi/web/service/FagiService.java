package gr.athena.innovation.fagi.web.service;

import gr.athena.innovation.fagi.FagiInstance;
import gr.athena.innovation.fagi.core.function.FunctionRegistry;
import gr.athena.innovation.fagi.exception.WrongInputException;
import gr.athena.innovation.fagi.utils.InputValidator;
import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.FagiOntology;
import gr.athena.innovation.fagi.web.model.OntologyProperty;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.xml.XMLBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
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
import java.util.Set;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.apache.commons.collections4.MultiValuedMap;
import org.apache.commons.collections4.multimap.ArrayListValuedHashMap;
import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.ObjectProperty;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.ontology.OntResource;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.util.iterator.ExtendedIterator;
import org.apache.logging.log4j.LogManager;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

/**
 *
 * @author nkarag
 */
@Service
public class FagiService implements IService{

    private static final org.apache.logging.log4j.Logger LOG = LogManager.getLogger(FagiService.class);
    private FagiInstance fagiInstance;

    @Override
    public boolean validateConfig(RulesConfigRequest configuration) {
        XMLBuilder xmlBuilder = new XMLBuilder();
        boolean isValid = xmlBuilder.validateConfig(configuration);
        return isValid;
    }

    @Override
    public boolean validateRulesXML(String configPath, String rulesPath) {
        FunctionRegistry functionRegistry = new FunctionRegistry();
        functionRegistry.init();
        Set<String> functionSet = functionRegistry.getFunctionMap().keySet();

        //passing null as config path in validator. Only rulesTag will be checked from this method.
        InputValidator validator = new InputValidator(configPath, functionSet);

        if (!validator.isValidRulesWithXSD(rulesPath)) {
            return false;
        }

        try {
            if (!validator.isValidFunctions(rulesPath)) {
                return false;
            }
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            LOG.info(ex);
            return false;
        }

        if(!validator.isValidConfigurationXSD()){
            return false;
        }
        
        return !validator.isValidOutputDirPath(configPath);
    }

    @Override
    public String constructRulesXML(String dirPath, RulesConfigRequest configuration) {

        try {

            XMLBuilder xmlBuilder = new XMLBuilder();

            //todo: get uploaded config and add rulesTag path to it.
            String rulesAbsolutePath = xmlBuilder.writeRulesToXML(dirPath, configuration);

            return rulesAbsolutePath;
        } catch (IOException ex) {
            LOG.error(ex);
        }

        return null;
    }

    @Override
    public void overwriteOutputPath(String configFilePath, String targetOutputPath) {

        try {

            if(!new File(targetOutputPath).isDirectory()){
                throw new ApplicationException("Output path is not a directory!");
            }
            
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(configFilePath);
            
            Node outputTag = doc.getElementsByTagName("outputDir").item(0);
            outputTag.setTextContent(targetOutputPath);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File(configFilePath));
            transformer.transform(source, result);
            
        } catch (ParserConfigurationException | SAXException | IOException | TransformerException ex) {
            LOG.error(ex);
        }

        LOG.info("OutputDir path overwrite success.");
    }

    @Override
    public void overwriteConfigurationRulesPath(String configFilePath, String targetPath) {
        try {

            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(configFilePath);

            Node rulesTag = doc.getElementsByTagName("rules").item(0);
            rulesTag.setTextContent(targetPath);

            // write the content into xml file
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File(configFilePath));
            transformer.transform(source, result);
            
        } catch (ParserConfigurationException | SAXException | IOException | TransformerException ex) {
            LOG.error(ex);
        }

        LOG.info("Rules path overwrite success.");
    }

    @Override
    public void fuse(String configPath) throws ApplicationException{
        try {

            if(fagiInstance == null){
                fagiInstance = new FagiInstance(configPath);
            }

            fagiInstance.run();

        } catch(Exception ex){
            throw new ApplicationException(ex.getLocalizedMessage());
        }
    }

    @Override
    public String compressDirectory(String dirPath) throws ApplicationException{

        FileOutputStream fos = null;
        try {

            String outputFilepath = new File(dirPath).getParent() + "/output.zip";

            fos = new FileOutputStream(outputFilepath);
            try (ZipOutputStream zipOut = new ZipOutputStream(fos)) {
                File fileToZip = new File(dirPath);
                zipFile(fileToZip, fileToZip.getName(), zipOut);
            }

            fos.close();
            LOG.info("outputFilepath: " + outputFilepath);

            return outputFilepath;

        } catch (FileNotFoundException ex) {
            LOG.error(ex);
        } catch (IOException ex) {
            LOG.error(ex);
        } finally {
            try {
                if(fos != null){
                    fos.close();
                }
            } catch (IOException ex) {
                LOG.error(ex);
            }
        }
        return null;
    }

    private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
        if (fileToZip.isHidden()) {
            return;
        }
        if (fileToZip.isDirectory()) {
            File[] children = fileToZip.listFiles();
            for (File childFile : children) {
                zipFile(childFile, fileName + "/" + childFile.getName(), zipOut);
            }
            return;
        }
        try (FileInputStream fis = new FileInputStream(fileToZip)) {
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOut.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int length;
            while ((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
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
            LOG.info("Could not create directory: " + directoryPath);
            throw new ApplicationException("Could not create directory: " + directoryPath);
        }

        return directoryPath;
    }

    @Override
    public String getStatistics(String path, List<String> statistics) throws ApplicationException, 
            WrongInputException, ParserConfigurationException, SAXException, IOException, ParseException {

        if(fagiInstance == null){
            fagiInstance = new FagiInstance(path);
        }

        return fagiInstance.computeStatistics(statistics);
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
