package com.bootcamp.backendintegrador.errors;

@SuppressWarnings("serial")
public class DuplicateException extends RuntimeException {
	
    public DuplicateException(String message) {
        super(message);
    }

    public DuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}
