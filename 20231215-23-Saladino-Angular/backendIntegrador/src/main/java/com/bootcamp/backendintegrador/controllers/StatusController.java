package com.bootcamp.backendintegrador.controllers;

import java.util.List;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.errors.ErrorHandler;
import com.bootcamp.backendintegrador.models.Status;
import com.bootcamp.backendintegrador.services.StatusService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/status") // Updated path to use plural form
@CrossOrigin(origins = "http://localhost:4200")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping()
    public ResponseEntity<?> getStatuses() {
        try {
            List<Status> statuses = statusService.getStatuses();
            return new ResponseEntity<>(statuses, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching status");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStatusById(@PathVariable Integer id) {
        try {
            Optional<Status> status = statusService.getStatusById(id);
            return new ResponseEntity<>(status, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching status by id");
        }
    }

    @PostMapping()
    public ResponseEntity<Object> createStatus(@Valid @RequestBody Status status, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            Status createdStatus = statusService.createStatus(status);
            return new ResponseEntity<>(createdStatus, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateStatus(@PathVariable Integer id, @Valid @RequestBody Status updatedStatus, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            Status result = statusService.updateStatus(id, updatedStatus);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has ocurred");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStatus(@PathVariable Integer id) {
        try {
            statusService.deleteStatus(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting status");
        }
    }
}
