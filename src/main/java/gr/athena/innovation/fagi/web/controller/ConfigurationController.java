package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.model.FagiOntology;
import gr.athena.innovation.fagi.web.model.OntologyResponse;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.service.IService;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private IService service;    
    
    @RequestMapping(value = "/action/upload", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse upload(@RequestBody String ontologyText) throws FileNotFoundException, IOException {

        FagiOntology ontology = service.getOntology(ontologyText);
        
        OntologyResponse response = new OntologyResponse();
        response.setOntology(ontology);        
        
        return response;
    }        
}
