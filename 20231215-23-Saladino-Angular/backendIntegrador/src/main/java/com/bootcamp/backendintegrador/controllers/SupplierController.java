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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.services.SupplierService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @GetMapping()
    public ResponseEntity<?> getAllSuppliers() {
        try {
            List<Supplier> suppliers = supplierService.getSuppliers();
            return new ResponseEntity<>(suppliers, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching suppliers");
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveSuppliers() {
        try {
            List<Supplier> activeSuppliers = supplierService.getSuppliersActive();
            return new ResponseEntity<>(activeSuppliers, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching active suppliers");
        }
    }

    @GetMapping("/deleted")
    public ResponseEntity<?> getDeletedSuppliers() {
        try {
            List<Supplier> deletedSuppliers = supplierService.getSuppliersDeleted();
            return new ResponseEntity<>(deletedSuppliers, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleted suppliers");
        }
    }
    
    @GetMapping("/businessNameAsc")
    public ResponseEntity<?> getSuppliersByBusinessNameAsc() {
        try {
            List<Supplier> deletedSuppliers = supplierService.getSuppliersByBusinessNameAsc();
            return new ResponseEntity<>(deletedSuppliers, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleted suppliers");
        }
    }
    
    @GetMapping("/businessNameDesc")
    public ResponseEntity<?> getSuppliersByBusinessNameDesc() {
        try {
            List<Supplier> deletedSuppliers = supplierService.getSuppliersByBusinessNameDesc();
            return new ResponseEntity<>(deletedSuppliers, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleted suppliers");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable Integer id) {
        try {
            Optional<Supplier> supplier = supplierService.getSupplierById(id);
            return new ResponseEntity<>(supplier, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching suppliers by id");
        }
    }

    @PostMapping()
    public ResponseEntity<?> createSupplier(@Valid @RequestBody Supplier supplier, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            Supplier createdSupplier = supplierService.postSupplier(supplier);
            return new ResponseEntity<>(createdSupplier, HttpStatus.CREATED); // Return 201 Created
        } catch (EntityNotFoundException e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable Integer id) {
        try {
            Supplier deletedSupplier = supplierService.deleteSupplier(id);
            if (deletedSupplier != null) {
                return new ResponseEntity<>(deletedSupplier, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting suppliers by id");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSupplier(@PathVariable Integer id, @Valid @RequestBody Supplier supplier, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
            }

            Supplier updatedSupplier = supplierService.putSupplier(id, supplier);
            if (updatedSupplier != null) {
                return new ResponseEntity<>(updatedSupplier, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }
        } catch (EntityNotFoundException e) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/undelete")
    public ResponseEntity<?> undeleteSupplierById(@PathVariable Integer id) {
        try {
            Supplier undeletedSupplier = supplierService.undeleteSupplierById(id);
            return new ResponseEntity<>(undeletedSupplier, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while undeleting suppliers by id");
        }
    }
}

