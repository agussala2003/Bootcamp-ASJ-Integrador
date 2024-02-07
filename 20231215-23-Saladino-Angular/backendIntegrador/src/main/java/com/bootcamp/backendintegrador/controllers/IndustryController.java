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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.errors.DuplicateException;
import com.bootcamp.backendintegrador.errors.ErrorHandler;
import com.bootcamp.backendintegrador.models.Industry;
import com.bootcamp.backendintegrador.services.IndustryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/industries")
@CrossOrigin(origins = "http://localhost:4200")
public class IndustryController {

    @Autowired
    private IndustryService industryService;

    @GetMapping()
    public ResponseEntity<?> getAllIndustries() {
        try {
            return new ResponseEntity<>(industryService.getAllIndustries(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching industries");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIndustryById(@PathVariable Integer id) {
        try {
            Optional<Industry> industry = industryService.getIndustryById(id);
            return new ResponseEntity<>(industry, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching industry by id: " + e.getMessage());
        }
    }
    
    @GetMapping("/active")
    public ResponseEntity<?> getActiveIndustries() {
        try {
            return new ResponseEntity<>(industryService.getActiveIndustries(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching active industries");
        }
    }
    
    @GetMapping("/deleted")
    public ResponseEntity<?> getDeletedIndustries() {
        try {
            return new ResponseEntity<>(industryService.getDeletedIndustries(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleted industries");
        }
    }

    @PostMapping()
    public ResponseEntity<?> postIndustry(@Valid @RequestBody Industry industry, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }
            Industry createdIndustry = industryService.createIndustry(industry);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIndustry);
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating industry: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateIndustry (@PathVariable Integer id, @Valid @RequestBody Industry industry, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }
            Industry updatedIndustry = industryService.updateIndustry(id,industry);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedIndustry);
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating industry: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIndustry(@PathVariable Integer id) {
        try {
            industryService.deleteIndustryById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting industry");
        }
    }
    
    @PatchMapping("/undelete/{id}")
    public ResponseEntity<?> undeleteIndustryById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(industryService.undeleteIndustryById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while undeleting order by id");
        }
    }
}

