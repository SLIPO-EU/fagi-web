package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.exception.Error;
import gr.athena.innovation.fagi.web.model.Workflow;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FusionController extends BaseController {

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

            System.out.println("Using directory: " + workflow.getCurrentDir());

            String rulesPath = service.constructRulesXML(workflow.getCurrentDir(), request);

            service.overwriteConfigurationRulesPath(workflow.getConfigFilePath(), rulesPath);

            try {
                
                if(!service.validateRulesXML(workflow.getConfigFilePath(), rulesPath)){
                    return new RestResponse(new Error("Invalid input", "Rules provided are invalid."));
                }

            } catch (Exception ex){
                return new RestResponse(new Error(ex.getMessage(), ex.toString()));
            }

            System.out.println("Basic validation complete. Initiating fusion process.");

            service.fuse(workflow.getConfigFilePath());

            RestResponse response = new RestResponse();
            response.add("Fusion complete. ", "Results at " + workflow.getCurrentDir());

            return response;
        } catch(ApplicationException ex){
            System.out.println(ex.getMessage());
            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    }
    
    @RequestMapping(value = "/action/fusion/download", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse downloadOutput(@RequestBody RulesConfigRequest config) {

        try{

            RestResponse response = new RestResponse();

            Thread.sleep(1500);
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    }
}
