package gr.athena.innovation.fagi.web.model;

import java.util.List;

/**
 *
 * @author nkarag
 */
public class StatisticsRequest {
    private List<String> statistics;

    public List<String> getStatistics() {
        return statistics;
    }

    public void setStatistics(List<String> statistics) {
        this.statistics = statistics;
    }
}
