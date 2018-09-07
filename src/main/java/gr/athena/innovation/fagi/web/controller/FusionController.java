package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.exception.Error;
import gr.athena.innovation.fagi.web.model.Workflow;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.service.IService;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FusionController extends BaseController {

    private static final org.apache.logging.log4j.Logger LOG = LogManager.getLogger(FusionController.class);

    @Autowired
    private IService service;

    @RequestMapping(value = {"/", "/configuration", "/specification", "/statistics"})
    public String index() {
        return "redirect:index.html";
    }

    @RequestMapping(value = "/action/fusion/run", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse fuse(@RequestBody RulesConfigRequest request) {

        try {

            if(!service.validateConfig(request)){
                return new RestResponse(new Error("Invalid input", "Rules provided empty."));
            }

            Workflow workflow = Workflow.getInstance();
            LOG.info("Using directory: " + workflow.getCurrentDir());
            String rulesPath = service.constructRulesXML(workflow.getCurrentDir(), request);
            service.overwriteConfigurationRulesPath(workflow.getConfigFilePath(), rulesPath);

            try {

                if(!service.validateRulesXML(workflow.getConfigFilePath(), rulesPath)){
                    return new RestResponse(new Error("Invalid input", "Rules provided are invalid."));
                }

            } catch (Exception ex){
                return new RestResponse(new Error(ex.getMessage(), ex.toString()));
            }

            LOG.info("Basic validation complete. Initiating fusion process.");

            service.fuse(workflow.getConfigFilePath());

            RestResponse response = new RestResponse();
            response.add("Fusion complete. ", "Results at " + workflow.getCurrentDir());

            return response;
        } catch(ApplicationException ex){
            LOG.info(ex.getMessage());
            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    }

    /**
     * Compresses the results in a zip file.
     *
     * @return the compressed file.
     */
    @RequestMapping(value = "/action/fusion/compress", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public RestResponse compress() {
        Workflow workflow = Workflow.getInstance();
        
        String outputZip = service.compressDirectory(workflow.getCurrentDir());
        
        workflow.setOutputZipPath(outputZip);
        RestResponse response = new RestResponse();
        return response;
    }
    
    /**
     * Downloads the resulted output files as a zip.
     *
     * @return the compressed file.
     */
    @RequestMapping(value = "/action/fusion/download", method = RequestMethod.GET, produces="application/zip")
    public ResponseEntity<InputStreamResource> download() {

        InputStream inputStream;

        try {

            Workflow workflow = Workflow.getInstance();
            String filePath = workflow.getOutputZipPath();
            inputStream = new FileInputStream(new File(filePath));
            InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(Files.size(Paths.get(filePath)));
            String configFilename = workflow.getConfigFilename();
            String filename = configFilename.substring(0,configFilename.lastIndexOf(".")) + "-fused.zip";
            headers.add("content-disposition", "attachment; filename=\"" + filename +"\"");

            return new ResponseEntity(inputStreamResource, headers, HttpStatus.OK);

        } catch (FileNotFoundException ex) {
            LOG.error(ex);
        } catch (IOException ex) {
            LOG.error(ex);
        }
        return null;
    }
}
