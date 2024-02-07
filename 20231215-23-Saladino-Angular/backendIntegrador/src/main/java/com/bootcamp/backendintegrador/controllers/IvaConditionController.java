package com.bootcamp.backendintegrador.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.bootcamp.backendintegrador.errors.ErrorHandler;
import com.bootcamp.backendintegrador.models.IvaCondition;
import com.bootcamp.backendintegrador.services.IvaConditionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/iva-conditions")
@CrossOrigin(origins = "http://localhost:4200")
public class IvaConditionController {

    @Autowired
    private IvaConditionService ivaConditionsService;

    @GetMapping()
    public ResponseEntity<?> getIvaConditionList() {
        try {
            List<IvaCondition> ivaConditions = ivaConditionsService.getIvaConditions();
            return ResponseEntity.ok(ivaConditions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching IvaConditions");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIvaConditionById(@PathVariable Integer id) {
    	try {
            Optional<IvaCondition> ivaCondition = ivaConditionsService.getIvaConditionById(id);
            return ResponseEntity.ok(ivaCondition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching IvaCondition by id");
        }
    }

    @PostMapping()
    public ResponseEntity<?> postIvaCondition(@Valid @RequestBody IvaCondition ivaCondition, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            IvaCondition createdIvaCondition = ivaConditionsService.postIvaCondition(ivaCondition);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIvaCondition);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating IvaCondition");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIvaCondition(@PathVariable Integer id) {
        try {
            ivaConditionsService.deleteIvaCondition(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting IvaCondition");
        }
    }
}
