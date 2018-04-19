package gr.athena.innovation.fagi.web.xml;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author nkarag
 */
public class Vocabulary {
    
    public static final String RULES = "rules";
    public static final String RULE = "rule";
    public static final String VALIDATION_RULE = "validationRule";
    
    public static final String DEFAULT_DATASET_ACTION = "defaultDatasetAction";
    
    public static final String VALIDATION_ACTION = "action";
    public static final String FUSION_ACTION = "action";
    
    public static final String PROPERTY_A = "propertyA";
    public static final String PROPERTY_B = "propertyB";

    public static final String DEFAULT_ACTION = "defaultAction";

    public static final String EXTERNAL_PROPERTY = "externalProperty";
    public static final String CONDITION = "condition";
    public static final String ACTION_RULE_SET = "actionRuleSet";
    public static final String ACTION_RULE = "actionRule";
    public static final String ACTION = "action";
    public static final String EXPRESSION = "expression";
    public static final String FUNCTION = "function";
    public static final String AND = "and";
    public static final String OR = "or";
    public static final String NOT = "not";
    public static final String NONE = "none";
    public static final String A = "a";
    public static final String B = "b";
    public static final String COMMA = ", ";

    public static final String ID = "id";
    
    public static final String LEFT = "A";
    public static final String RIGHT = "B";
    
    public static final Map<String, Integer> functionParameters = createFunctionMap();
    
    private static Map<String, Integer> createFunctionMap(){
        
        Map<String,Integer> map = new HashMap<>();
        map.put("isDateKnownFormat", 1);
        map.put("isDatePrimaryFormat", 1);
        map.put("isValidDate", 1);
        map.put("isGeometryMoreComplex", 1);
        map.put("isLiteralAbbreviation", 1);
        map.put("isSameSimpleNormalize", 3);
        map.put("isSameCustomNormalize", 3);
        map.put("isPhoneNumberParsable", 1);
        map.put("isSamePhoneNumber", 2);
        map.put("isSamePhoneNumberCustomNormalize", 2);
        map.put("isSamePhoneNumberUsingExitCode", 3);
        map.put("exists", 1);
        map.put("notExists", 1);

        return map;
    }    
    
}
