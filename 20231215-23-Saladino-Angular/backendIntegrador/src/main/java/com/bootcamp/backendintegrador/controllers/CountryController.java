package com.bootcamp.backendintegrador.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.models.Country;
import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.services.CountryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/countries")
@CrossOrigin(origins = "http://localhost:4200")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping()
    public ResponseEntity<?> getAllCountries() {
    try {
    	return new ResponseEntity<>(countryService.getAllCountries(), HttpStatus.OK);
	} catch (Exception e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching countries");
	}
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCountryById(@PathVariable Integer id) {
    	try {
            Optional<Country> country = countryService.getCountryById(id);
            return new ResponseEntity<>(country, HttpStatus.OK);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching countries by id");
		}
    }
    
    @PostMapping()
    public ResponseEntity<Object> postCountry(@Valid @RequestBody Country country, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }
            Country createdCountry = countryService.createCountry(country);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCountry);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable Integer id) {
    	try {
            countryService.deleteCountryById(id);
            return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting country");
		}
    }
}
