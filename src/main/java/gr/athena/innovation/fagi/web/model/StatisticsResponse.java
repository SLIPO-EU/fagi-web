package gr.athena.innovation.fagi.web.model;

import java.util.Map;

/**
 *
 * @author nkarag
 */
public class StatisticsResponse extends RestResponse {
    
    private Map<String, String> statPairsA;
    private Map<String, String> statPairsB;

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


    
}
