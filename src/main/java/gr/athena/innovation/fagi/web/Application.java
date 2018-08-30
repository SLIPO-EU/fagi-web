package gr.athena.innovation.fagi.web;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

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

    private static final Logger LOG = LogManager.getRootLogger();
    
    @Bean
    DirectoryManager manager() {
        return new DirectoryManager();
    }

    public static void main(String[] args) {

        LOG.info("starting application");
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
            LOG.info("init");
            //create directory that fagi outputs will reside.
        }

        public void clean() {
            LOG.info("cleaning");
            //todo: clean directory
        }

        @PreDestroy
        public void destroy() {
            //close service
            //todo: clean all
            LOG.debug("destroy");
        }
    }
}
