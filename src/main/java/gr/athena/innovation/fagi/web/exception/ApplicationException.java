package gr.athena.innovation.fagi.web.exception;

/**
 *
 * @author nkarag
 */
public class ApplicationException extends RuntimeException {
    public ApplicationException() {}

    public ApplicationException(String message){
       super(message);
    }    
}
