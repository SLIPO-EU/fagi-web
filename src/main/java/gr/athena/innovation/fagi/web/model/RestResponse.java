package gr.athena.innovation.fagi.web.model;

import java.util.ArrayList;

/**
 *
 * @author nkarag
 */
public class RestResponse {

    private final ArrayList<Error> errors = new ArrayList<>();

    public RestResponse() {
    }

    public RestResponse(Error error) {
        this.errors.add(error);
    }

    public RestResponse(ArrayList<Error> errors) {
        this.errors.addAll(errors);
    }
    
    public RestResponse(String code, String description) {
        this.add(code, description);
    }
    
    public boolean getSuccess() {
        return (this.errors.isEmpty());
    }

    public ArrayList<Error> getErrors() {
        return this.errors;
    }

    public void add(String code, String description) {
        this.errors.add(new Error(code, description));
    }

    public void add(Error error) {
        this.errors.add(error);
    }

    public void add(ArrayList<Error> errors) {
        this.errors.addAll(errors);
    }

    public RestResponse toRestResponse() {
        if (this instanceof RestResponse) {
            return this;
        }

        return new RestResponse(this.getErrors());
    }
}
