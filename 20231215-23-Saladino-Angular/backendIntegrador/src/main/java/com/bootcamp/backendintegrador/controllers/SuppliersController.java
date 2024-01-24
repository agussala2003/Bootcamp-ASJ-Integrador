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
import com.bootcamp.backendintegrador.models.SuppliersModel;
import com.bootcamp.backendintegrador.services.SuppliersService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class SuppliersController {
	
	@Autowired
	SuppliersService suppliersService;
	
	@GetMapping()
	public ResponseEntity<List<SuppliersModel>> getSuppliers() {
		return new ResponseEntity<List<SuppliersModel>>(suppliersService.getSuppliers(),HttpStatus.OK);
	}
	
	@GetMapping("/active")
	public ResponseEntity<List<SuppliersModel>> getSuppliersActive() {
		return new ResponseEntity<List<SuppliersModel>>(suppliersService.getSuppliersActive(),HttpStatus.OK);
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<SuppliersModel>> getSuppliersDeleted() {
		return new ResponseEntity<List<SuppliersModel>>(suppliersService.getSuppliersDeleted(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<SuppliersModel>> getSupplierById(@PathVariable Integer id) {
		return new ResponseEntity< Optional<SuppliersModel>>(suppliersService.getSupplierById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> postSupplier(@Valid @RequestBody SuppliersModel supplier, BindingResult bindingResult){
	    if(bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorHandler().validation(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<>(suppliersService.postSupplier(supplier), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<SuppliersModel> deleteSupplier(@PathVariable Integer id) {
		return new ResponseEntity<SuppliersModel>(suppliersService.deleteSupplier(id),HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> putSupplier(@PathVariable Integer id, @Valid @RequestBody SuppliersModel supplier, BindingResult bindingResult) {
	    if(bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorHandler().validation(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<>(suppliersService.putSupplier(id, supplier), HttpStatus.OK);
	}
	
}
