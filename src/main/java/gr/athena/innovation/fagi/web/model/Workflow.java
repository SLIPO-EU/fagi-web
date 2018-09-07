package gr.athena.innovation.fagi.web.model;

import gr.athena.innovation.fagi.exception.ApplicationException;

/**
 * Class for the current workflow management
 * 
 * @author nkarag
 */
public class Workflow {
    
    private static Workflow workflow;
    private String configFilename;
    private String currentDir;
    private String configurationContent;
    private String configFilePath;
    private String outputZipPath;
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

    /**
     * 
     * @return the current directory of this workflow.
     */
    public String getCurrentDir() {
        return currentDir;
    }

    /**
     * Sets the current directory of the workflow.
     * @param currentDir the current directory.
     */
    public void setCurrentDir(String currentDir) {
        this.currentDir = currentDir;
    }

    /**
     *
     * @return the configuration content as a string value.
     */
    public String getConfigurationContent() {
        return configurationContent;
    }

    /**
     * The configuration content as a string.
     * @param configurationContent the configuration content.
     */
    public void setConfigurationContent(String configurationContent) {
        this.configurationContent = configurationContent;
    }

    public String getOntology() {
        return ontology;
    }

    public void setOntology(String ontology) {
        this.ontology = ontology;
    }
    
    /**
     * Cleans all fields of the current workflow object.
     */
    public void clean(){
        currentDir = null;
        configurationContent = null;
        ontology = null;
    }

    /**
     *
     * @return the absolute path of the configuration XML.
     */
    public String getConfigFilePath() {
        return configFilePath;
    }

    /**
     * Sets the absolute file path of the configuration XML. 
     * @param configFilePath
     */
    public void setConfigFilePath(String configFilePath) {
        this.configFilePath = configFilePath;
    }

    /**
     * 
     * @return the absolute path of the zip file.
     */
    public String getOutputZipPath() {
        return outputZipPath;
    }

    /**
     * Sets the absolute path for the compressed file.
     * @param outputZipPath the path.
     */
    public void setOutputZipPath(String outputZipPath) {
        this.outputZipPath = outputZipPath;
    }

    /**
     * 
     * @return the name of the configuration file.
     */
    public String getConfigFilename() {
        return configFilename;
    }

    /**
     * Sets the name of the configuration file.
     * @param configFilename the name of the file.
     */
    public void setConfigFilename(String configFilename) {
        this.configFilename = configFilename;
    }
}
