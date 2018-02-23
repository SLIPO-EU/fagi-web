package gr.athena.innovation.fagi.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

@Controller
public class TestController {

    @RequestMapping("/")
    public String index() {
        return "redirect:index.html";
    }

}

