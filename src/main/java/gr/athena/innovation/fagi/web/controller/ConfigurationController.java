package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.FagiOntology;
import gr.athena.innovation.fagi.web.model.OntologyResponse;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.exception.Error;
import gr.athena.innovation.fagi.web.model.ConfigurationUploadRequest;
import gr.athena.innovation.fagi.web.model.Workflow;
import gr.athena.innovation.fagi.web.service.IService;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller providing methods for uploading configuration file and ontology.
 * 
 * @author nkarag
 */
@Controller
public class ConfigurationController {
    
    @Autowired
    private IService service;    

    @RequestMapping(value = "/action/submit", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse submit(@RequestBody ConfigurationUploadRequest request){
        System.out.println("Submitting configuration. Starting new workflow.");
        Workflow workflow = Workflow.getInstance();
        workflow.clean();

        try {
            
            RestResponse response = new RestResponse(); 
            String dirPath = service.getNewDirectoryPath();
            workflow.setCurrentDir(dirPath);
            
            String configFilepath = dirPath + "/" + request.getName();
            workflow.setConfigFilePath(configFilepath);

            FileUtils.writeStringToFile(new File(configFilepath), request.getConfiguration(), Charset.forName("UTF-8"));

            return response;

        } catch (ApplicationException | IOException ex){
            System.out.println(ex.getMessage());
            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    } 

    @RequestMapping(value = "/action/upload", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse upload(@RequestBody String ontologyText){
        try {

            FagiOntology ontology = service.getOntology(ontologyText);

            OntologyResponse response = new OntologyResponse();
            response.setOntology(ontology);        

            return response;

        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    }
}
