package gr.athena.innovation.fagi.web.model;

/**
 *
 * @author nkarag
 */
public class FusionResponse extends RestResponse {

    private String fusionResultsPath;

    public String getFusionResultsPath() {
        return fusionResultsPath;
    }

    public void setFusionResultsPath(String fusionResultsPath) {
        this.fusionResultsPath = fusionResultsPath;
    }
}
