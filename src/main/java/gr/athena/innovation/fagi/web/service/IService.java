package gr.athena.innovation.fagi.web.service;

import gr.athena.innovation.fagi.exception.WrongInputException;
import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.FagiOntology;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;

/**
 * Interface for the service methods of FAGI.
 * 
 * @author nkarag
 */
public interface IService {
    
	/**
	 * Validates the rules specification.
	 *
     * @param configuration the configuration request.
     * @return true if the validation succeeded, false otherwise. 
	 */    
    abstract boolean validateConfig(RulesConfigRequest configuration);
    
	/**
	 * Constructs the XML configuration file.
	 *
     * @param dirPath the directory to save the configuration file.
     * @param configuration the configuration request.
     * @return the filename (absolute path).
	 */    
    abstract String constructConfig(String dirPath, RulesConfigRequest configuration);
    
	/**
	 * Executes the fusion process.
	 *
     * @param configPath the XML configuration path.
	 */    
    abstract void fuse(String configPath) throws ApplicationException;
    
	/**
	 * Returns a new directory path to save the config file and the output results.
	 *
     * @return the absolute path of the directory.
	 */    
    abstract String getNewDirectoryPath() throws ApplicationException;
    
	/**
	 * Calculates and returns a JSON string containing the statistics.
	 *
     * @param path the configuration path.
	 * @param statistics the selected statistics.
     * @return the JSON string containing the statistics. 
	 * @throws ApplicationException if an exception is thrown.
     * @throws gr.athena.innovation.fagi.exception.WrongInputException if something is wrong concerning the input files.
     * @throws javax.xml.parsers.ParserConfigurationException
     * @throws org.xml.sax.SAXException
     * @throws java.io.IOException
     * @throws java.text.ParseException
	 */
	abstract String getStatistics(String path, List<String> statistics) throws ApplicationException, 
            WrongInputException, ParserConfigurationException, SAXException, IOException, ParseException;

	/**
	 * Creates the ontology object.
	 *
     * @param ontologyText the ontology text provided from the user.
     * @return the ontology object.
	 */    
    abstract FagiOntology getOntology(String ontologyText);
}
