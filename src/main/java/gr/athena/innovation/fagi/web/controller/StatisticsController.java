package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.model.StatisticsRequest;
import gr.athena.innovation.fagi.web.model.StatisticsResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StatisticsController {

    @RequestMapping(value = "/action/statistics/run", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public RestResponse getStatistics() {
             
        //return mockup object to test the ui
        
//            StatisticsCollector collector = new RDFStatisticsCollector();
//            StatisticsExporter exporter = new StatisticsExporter();
//
//            StatisticsContainer container = collector.collect();
//            container.getNamePercentage().getName();
//            container.getNamePercentage().getA();
//            container.getNamePercentage().getB();
        
        try{
            
            
            Map<String, String> statPairsA = new HashMap<>();
            statPairsA.put("Name", "96");
            statPairsA.put("Phone", "84");
            statPairsA.put("Address", "46");
            statPairsA.put("Date", "12");

            Map<String, String> statPairsB = new HashMap<>();
            statPairsB.put("Name", "89");
            statPairsB.put("Phone", "72");
            statPairsB.put("Address", "82");
            statPairsB.put("Date", "21");        

            StatisticsResponse response = new StatisticsResponse();
            
            response.setStatPairsA(statPairsA);
            response.setStatPairsB(statPairsB);
            
            //simulate calculation time for response
            Thread.sleep(2000);
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }
    
    @RequestMapping(value = "/action/statistics/selected", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse getSelectedStatistics(@RequestBody StatisticsRequest request) {

        try{
            
            Map<String, String> statPairsA = new HashMap<>();
            Map<String, String> statPairsB = new HashMap<>();

            StatisticsResponse response = new StatisticsResponse();
            
            response.setStatPairsA(statPairsA);
            response.setStatPairsB(statPairsB);

            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }    
}

