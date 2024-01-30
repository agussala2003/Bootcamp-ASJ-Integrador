package com.bootcamp.backendintegrador.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.models.Province;
import com.bootcamp.backendintegrador.services.ProvinceService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/provinces")
@CrossOrigin(origins = "http://localhost:4200")
public class ProvinceController {

    @Autowired
    private ProvinceService provinceService;

    @GetMapping()
    public ResponseEntity<?> getAllProvinces() {
        try {
            List<Province> provinces = provinceService.getProvinces();
            return ResponseEntity.ok(provinces);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching provinces");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProvinceById(@PathVariable Integer id) {
        try {
            Optional<Province> province = provinceService.getProvinceById(id);
            return ResponseEntity.ok(province);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching province by ID");
        }
    }

    @GetMapping("/by-country/{countryId}")
    public ResponseEntity<?> getProvincesByCountryId(@PathVariable Integer countryId) {
        try {
            List<Province> provinces = provinceService.getProvincesByCountryId(countryId);
            return ResponseEntity.ok(provinces);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching provinces by country ID");
        }
    }

    @PostMapping()
    public ResponseEntity<?> createProvince(@Valid @RequestBody Province province, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Province createdProvince = provinceService.createProvince(province);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProvince);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProvince(@PathVariable Integer id, @Valid @RequestBody Province updatedProvince, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Province result = provinceService.updateProvince(id, updatedProvince);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Province not found");
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProvince(@PathVariable Integer id) {
        try {
            provinceService.deleteProvince(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting province");
        }
    }
}
