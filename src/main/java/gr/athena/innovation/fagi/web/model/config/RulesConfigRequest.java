package gr.athena.innovation.fagi.web.model.config;

/**
 *
 * @author nkarag
 */
public class RulesConfigRequest {
    
    private String datasetAction;
    private ValidationRules validationRules;
    private RuleSet ruleset;
    
    public String getDatasetAction() {
        return datasetAction;
    }
    
    public ValidationRules getValidationRules() {
        return validationRules;
    }

    public RuleSet getRuleset() {
        return ruleset;
    }


}

//{"ruleset":{"rules":[{"id":1,"fusionPropertyA":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","fusionPropertyB":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","actionRules":[{"id":1,"query":{"id":"g-ec03a270-6530-40a8-bcd9-e014a3f3b813","rules":[{"id":"r-f2c523a9-c422-40c7-aa2e-fe9ce57b30d7","field":"isDateKnownFormat","value":"","operator":{"dataset":"A","propA":{"type":"property","key":"name","label":"name","value":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","selected":null,"disabled":false},"propB":{"type":"property","key":"name","label":"name","value":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","selected":null,"disabled":false},"threshold":0}},{"id":"r-2124091a-e09d-44b7-a0a0-543091f471c0","field":"isDateKnownFormat","value":"","operator":{"dataset":"A","propA":{"type":"property","key":"name","label":"name","value":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","selected":null,"disabled":false},"propB":{"type":"property","key":"name","label":"name","value":"http://slipo.eu/def#name http://slipo.eu/def#nameValue","selected":null,"disabled":false},"threshold":0}}],"combinator":"and"}}]}]}}
