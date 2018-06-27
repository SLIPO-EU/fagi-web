package gr.athena.innovation.fagi.web.controller;

import com.google.gson.Gson;
import gr.athena.innovation.fagi.web.model.OntologyResponse;
import gr.athena.innovation.fagi.web.model.RestResponse;
import gr.athena.innovation.fagi.web.model.StatisticsResponse;
import gr.athena.innovation.fagi.web.model.config.RulesConfigRequest;
import gr.athena.innovation.fagi.web.xml.XMLBuilder;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.apache.jena.ontology.OntModelSpec;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.NodeIterator;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.rdf.model.StmtIterator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FusionController {

    @RequestMapping("/")
    public String index() {
        return "redirect:index.html";
    }

    @RequestMapping(value = "/action/statistics/run", method = RequestMethod.GET, consumes = "application/json", produces = "application/json")
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
            Thread.sleep(1000);
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(ex.getMessage(), ex.toString());
        }
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
            Thread.sleep(200);
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());

            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }
    
    @RequestMapping(value = "/action/upload", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public RestResponse upload(@RequestBody String ontologyText) throws FileNotFoundException, IOException {

        File temp = File.createTempFile("ontologyTemp", ".owl");

        try (PrintWriter pw = new PrintWriter(temp)) {
            pw.write(ontologyText);
        }
        
        Model model = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM);
        model.read(temp.getAbsolutePath());

        List<String> properties = new ArrayList<>();
        NodeIterator nodeIterator = model.listObjects();
        while (nodeIterator.hasNext()){
            RDFNode node = nodeIterator.next();
            if(node.isResource()){
                System.out.println(node);
                properties.add(node.toString());
            }
        }
        
        System.out.println("ontology size: " + model.size());

        try{

            OntologyResponse response = new OntologyResponse();
            response.setProperties(properties);

            temp.delete();
            
            return response;
            
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            temp.delete();
            return new RestResponse(ex.getMessage(), ex.toString());
        }
    }    
}

