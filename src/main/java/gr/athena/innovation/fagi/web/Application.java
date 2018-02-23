package gr.athena.innovation.fagi.web;

import gr.athena.innovation.fagi.Fagi;
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author nkarag
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {


            String[] beanNames = ctx.getBeanDefinitionNames();

            String[] fagiArgs = {""};
            //Fagi.main(fagiArgs);

        };
    }

}
