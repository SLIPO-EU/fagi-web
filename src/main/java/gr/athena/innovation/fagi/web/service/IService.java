package gr.athena.innovation.fagi.web.service;

import gr.athena.innovation.fagi.exception.WrongInputException;
import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.FagiOntology;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;

/**
 *
 * @author nkarag
 */
public interface IService {
    
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
	String getStatistics(String path, List<String> statistics) throws ApplicationException, 
            WrongInputException, ParserConfigurationException, SAXException, IOException, ParseException;

	/**
	 * Creates the ontology object.
	 *
     * @param ontologyText the ontology text provided from the user.
     * @return the ontology object.
	 */    
    FagiOntology getOntology(String ontologyText);
}
