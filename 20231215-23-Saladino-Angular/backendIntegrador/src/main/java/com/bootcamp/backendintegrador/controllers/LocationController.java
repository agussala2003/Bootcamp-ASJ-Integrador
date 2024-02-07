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
import com.bootcamp.backendintegrador.errors.ValidationException;
import com.bootcamp.backendintegrador.models.Location;
import com.bootcamp.backendintegrador.services.LocationService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/locations")
@CrossOrigin(origins = "http://localhost:4200")
public class LocationController {

    @Autowired
    private LocationService locationsService;

    @GetMapping()
    public ResponseEntity<?> getAllLocations() {
        try {
            List<Location> locations = locationsService.getLocations();
            return ResponseEntity.ok(locations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching locations");
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable Integer id) {
        try {
            Optional<Location> location = locationsService.getLocationById(id);
            return ResponseEntity.ok(location);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching location by id");
        }
    }

    @PostMapping()
    public ResponseEntity<?> postLocation(@Valid @RequestBody Location location, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Location createdLocation = locationsService.postLocation(location);
            return ResponseEntity.ok(createdLocation);
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating location");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> putLocation(@PathVariable Integer id, @Valid @RequestBody Location updatedLocation, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Location result = locationsService.putLocation(id, updatedLocation);
            return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating location");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Integer id) {
        try {
            locationsService.deleteLocation(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting location");
        }
    }
}
