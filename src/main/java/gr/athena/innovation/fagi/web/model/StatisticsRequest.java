package gr.athena.innovation.fagi.web.model;

import java.util.List;

/**
 *
 * @author nkarag
 */
public class StatisticsRequest {
    private List<String> statistics;
    private String configPath;

    public List<String> getStatistics() {
        return statistics;
    }

    public void setStatistics(List<String> statistics) {
        this.statistics = statistics;
    }

    public String getConfigPath() {
        return configPath;
    }

    public void setConfigPath(String configPath) {
        this.configPath = configPath;
    }
}
