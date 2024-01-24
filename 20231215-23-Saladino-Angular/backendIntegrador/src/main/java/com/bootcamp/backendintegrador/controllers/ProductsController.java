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

import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.models.ProductsModel;
import com.bootcamp.backendintegrador.services.ProductsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductsController {
	
	@Autowired
	ProductsService productsService;
	
	@GetMapping()
	public ResponseEntity<List<ProductsModel>> getProducts(){
		return new ResponseEntity<List<ProductsModel>>(productsService.getProducts(),HttpStatus.OK);
	}
	
	@GetMapping("/active")
	public ResponseEntity<List<ProductsModel>> getProductsActive(){
		return new ResponseEntity<List<ProductsModel>>(productsService.getProductsActive(),HttpStatus.OK);
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<ProductsModel>> getProductsDeleted(){
		return new ResponseEntity<List<ProductsModel>>(productsService.getProductsDeleted(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ProductsModel>> getProductById(@PathVariable Integer id){
		return new ResponseEntity<Optional<ProductsModel>>(productsService.getProductById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> postProduct(@Valid @RequestBody ProductsModel product, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validation(bindingResult);
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(productsService.postProduct(product), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ProductsModel> deleteProductById(@PathVariable Integer id){
		return new ResponseEntity<ProductsModel>(productsService.deleteProductById(id),HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> putProduct(@Valid @RequestBody ProductsModel product,@PathVariable Integer id, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorHandler().validation(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
		return new ResponseEntity<>(productsService.putProduct(id, product), HttpStatus.OK);
	}
}
