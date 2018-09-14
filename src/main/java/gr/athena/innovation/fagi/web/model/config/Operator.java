package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class Operator {
    private String dataset;
    private Property propA;
    private Property propB;
    private String threshold;
    private String threshold2;
    private String threshold3;

    public String getDataset() {
        return dataset;
    }

    public Property getPropA() {
        return propA;
    }

    public Property getPropB() {
        return propB;
    }

    public String getThreshold() {
        return threshold;
    }

    public String getThreshold2() {
        return threshold2;
    }

    public void setThreshold2(String threshold2) {
        this.threshold2 = threshold2;
    }

    public String getThreshold3() {
        return threshold3;
    }

    public void setThreshold3(String threshold3) {
        this.threshold3 = threshold3;
    }
}
