package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.ApplicationException;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FusionController {

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
                return new RestResponse("Wrong input", "Rules provided invalid or empty.");
            }

            String dirPath = service.getNewDirectoryPath();
            System.out.println("Directory created: " + dirPath);

            String configPath = service.constructConfig(dirPath, request);
            service.fuse(configPath);
            
            RestResponse response = new RestResponse();
            response.add("Fusion complete. ", "Results at " + dirPath);
            
            return response;
        } catch(ApplicationException ex){
            System.out.println(ex.getMessage());
            return new RestResponse(ex.getMessage(), ex.toString());
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

            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }
}
