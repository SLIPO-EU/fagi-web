package gr.athena.innovation.fagi.web.model;

import gr.athena.innovation.fagi.exception.ApplicationException;

/**
 *
 * @author nkarag
 */
public class Workflow {
    
    private static Workflow workflow;
    private String currentDir;
    private String configurationContent;
    private String configFilePath;
    private String outputZipPath;
    private String rules;
    private String ontology;

    private Workflow() {

    }

    public static Workflow getInstance() throws ApplicationException {
        //lazy init
        if (workflow == null) {
            workflow = new Workflow();
        }
        return workflow;
    }

    public String getCurrentDir() {
        return currentDir;
    }

    public void setCurrentDir(String currentDir) {
        this.currentDir = currentDir;
    }

    public String getConfigurationContent() {
        return configurationContent;
    }

    public void setConfigurationContent(String configurationContent) {
        this.configurationContent = configurationContent;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public String getOntology() {
        return ontology;
    }

    public void setOntology(String ontology) {
        this.ontology = ontology;
    }
    
    public void clean(){
        currentDir = null;
        configurationContent = null;
        rules = null;
        ontology = null;
    }

    public String getConfigFilePath() {
        return configFilePath;
    }

    public void setConfigFilePath(String configFilePath) {
        this.configFilePath = configFilePath;
    }

    public String getOutputZipPath() {
        return outputZipPath;
    }

    public void setOutputZipPath(String outputZipPath) {
        this.outputZipPath = outputZipPath;
    }
}
