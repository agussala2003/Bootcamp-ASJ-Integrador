package com.bootcamp.backendintegrador.models;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.BindingResult;

public class ErrorHandler {
	public static Map<String,String> validation(BindingResult bindingResult) {
		
		Map<String,String> errors = new HashMap<>();
		
		bindingResult.getFieldErrors().forEach((error) -> {
			String campoString = error.getField();
			String errMsjString = error.getDefaultMessage();
			errors.put(campoString, errMsjString);
		});
		
		return errors;
	}
}
