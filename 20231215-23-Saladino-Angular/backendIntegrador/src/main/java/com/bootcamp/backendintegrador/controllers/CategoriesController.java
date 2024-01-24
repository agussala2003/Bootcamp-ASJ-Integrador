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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.models.CategoriesModel;
import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.services.CategoriesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriesController {
	
	@Autowired
	CategoriesService categoriesService;
	
	@GetMapping()
	public ResponseEntity<List<CategoriesModel>> getCategories() {
		return new ResponseEntity<List<CategoriesModel>>(categoriesService.getCategories(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<CategoriesModel>> getCategoryById(@PathVariable Integer id) {
		return new ResponseEntity< Optional<CategoriesModel>>(categoriesService.getCategoryById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> postCategory(@Valid @RequestBody CategoriesModel category, BindingResult bindingResult){
	    if(bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorHandler().validation(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<>(categoriesService.postCategory(category), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<CategoriesModel> deleteCategory(@PathVariable Integer id) {
		return new ResponseEntity<CategoriesModel>(categoriesService.deleteCategory(id),HttpStatus.NO_CONTENT);
	}
	
}
