package gr.athena.innovation.fagi.web.model;

import java.util.Map;

/**
 *
 * @author nkarag
 */
public class StatisticsResponse extends RestResponse {

    private Map<String, String> statPairsA;
    private Map<String, String> statPairsB;
    private String jsonString;

    public Map<String, String> getStatPairsA() {
        return statPairsA;
    }

    public void setStatPairsA(Map<String, String> statPairsA) {
        this.statPairsA = statPairsA;
    }

    public Map<String, String> getStatPairsB() {
        return statPairsB;
    }

    public void setStatPairsB(Map<String, String> statPairsB) {
        this.statPairsB = statPairsB;
    }

    public String getJsonString() {
        return jsonString;
    }

    public void setJsonString(String jsonString) {
        this.jsonString = jsonString;
    }
}
