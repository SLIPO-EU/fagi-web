package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class Operator {
    private String dataset;
    private Property propA;
    private Property propB;
    private double threshold;

    public String getDataset() {
        return dataset;
    }

    public Property getPropA() {
        return propA;
    }

    public Property getPropB() {
        return propB;
    }

    public double getThreshold() {
        return threshold;
    }
}
