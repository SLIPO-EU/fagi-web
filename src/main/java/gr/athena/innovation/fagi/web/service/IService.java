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
	 * Validates the produced rules specification XML file.
	 *
     * @param configPath the configuration XML file path.
     * @param rulesPath the rules specification file path.
     * @return true if the validation succeeded, false otherwise. 
	 */    
    abstract boolean validateRulesXML(String configPath, String rulesPath);

	/**
	 * Constructs the rules specification XML file.
	 *
     * @param dirPath the directory to save the configuration file.
     * @param configuration the configuration request.
     * @return the filename (absolute path) of the rules XML file.
	 */
    abstract String constructRulesXML(String dirPath, RulesConfigRequest configuration);

	/**
	 * Overwrite the default rules path with an updated one in configuration XML file.
	 *
     * @param configFilePath the configuration XML absolute file path.
     * @param targetPath the target path of the rules file. 
	 */    
    abstract void overwriteConfigurationRulesPath(String configFilePath, String targetPath);

	/**
	 * Executes the fusion process.
	 *
     * @param configPath the XML configuration path.
	 */    
    abstract void fuse(String configPath) throws ApplicationException;

	/**
	 * Compresses the given directory.
	 *
     * @param directoryPath the directory path.
     * @return the absolute path of the compressed file.
	 */    
    abstract String compressDirectory(String directoryPath) throws ApplicationException;

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
