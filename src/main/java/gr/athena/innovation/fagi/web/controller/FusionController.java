package gr.athena.innovation.fagi.web.controller;

import com.google.gson.Gson;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.xml.XMLBuilder;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FusionController {

    @RequestMapping(value = {"/", "/configuration", "/specification", "/statistics"})
    public String index() {
        return "redirect:index.html";
    }

    @RequestMapping(value = "/action/fusion/run", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse fuse(@RequestBody RulesConfigRequest config) {

        Gson gson = new Gson();
        String s = gson.toJson(config);
        System.out.println(s);
        
        XMLBuilder xmlBuilder = new XMLBuilder();
        
        try {
            
            xmlBuilder.writeRulesToXML(config);
            
        } catch (IOException ex) {
            Logger.getLogger(FusionController.class.getName()).log(Level.SEVERE, null, ex);
        }
        try{

            RestResponse response = new RestResponse();
            
            //simulate calculation time for response
            Thread.sleep(1500);
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }
}
