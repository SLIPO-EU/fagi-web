package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.Error;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.model.StatisticsRequest;
import gr.athena.innovation.fagi.web.model.StatisticsResponse;
import gr.athena.innovation.fagi.web.model.Workflow;
import java.io.File;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import gr.athena.innovation.fagi.web.service.IService;

@Controller
public class StatisticsController {

    @Autowired
    private IService service;
    
    @RequestMapping(value = "/action/statistics/selected", method = RequestMethod.POST, 
            consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse getSelectedStatistics(@RequestBody StatisticsRequest request) {

        try{

            String path = Workflow.getInstance().getConfigFilePath();

            File f = new File(path);
            if(StringUtils.isBlank(path) || !f.exists() || f.isDirectory()) {
                return new RestResponse(new Error("Wrong path", path + " is not valid."));
                
            } else {

                StatisticsResponse response = new StatisticsResponse();
                String jsonString = service.getStatistics(path, request.getStatistics());
                
                response.setJsonString(jsonString);

                return response;                
            }
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new RestResponse(new Error(ex.getMessage(), ex.toString()));
        }
    }    
}

