package gr.athena.innovation.fagi.web;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

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

    @Bean
    DirectoryManager manager() {
        return new DirectoryManager();
    }

    public static void main(String[] args) {

        System.out.println("starting application");
        ApplicationContext context = SpringApplication.run(Application.class, args);
        
        DirectoryManager manager = context.getBean(DirectoryManager.class);
        manager.clean();
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            //String[] beanNames = ctx.getBeanDefinitionNames();
            //String[] fagiArgs = {""};
            //Fagi.main(fagiArgs);

        };
    }

    private static class DirectoryManager {

        @PostConstruct
        public void init() {
            System.out.println("init");
            //create directory that fagi outputs will reside.
        }

        public void clean() {
            System.out.println("cleaning");
            //todo: clean directory
        }

        @PreDestroy
        public void destroy() {
            //close service
            //todo: clean all
            System.out.println("destroy");
        }
    }
}
