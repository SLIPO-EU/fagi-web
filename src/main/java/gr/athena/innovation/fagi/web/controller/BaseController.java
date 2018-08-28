package gr.athena.innovation.fagi.web.controller;

import gr.athena.innovation.fagi.web.exception.ApplicationException;

/**
 * Base controller class providing helper methods for creating application messages, errors and responses.
 * 
 * @author nkarag
 */
public abstract class BaseController {
    
    /**
     * Returns an {@link Error} based on a {@link Exception}.
     *
     * @param ex the exception.
     * @return the localized error.
     */
    protected Error getError(Exception ex) {
        if (ex instanceof ApplicationException) {
            ApplicationException applicationException = (ApplicationException) ex;

            return new Error(applicationException.getMessage());
        }
        return new Error(ex);
    }
}
