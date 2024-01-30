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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.models.Product;
import com.bootcamp.backendintegrador.services.ProductService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	
	@Autowired
	ProductService productsService;
	
	@GetMapping()
    public ResponseEntity<?> getProducts() {
        try {
            List<Product> products = productsService.getProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching products");
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getProductsActive() {
        try {
            List<Product> products = productsService.getProductsActive();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching active products");
        }
    }

    @GetMapping("/deleted")
    public ResponseEntity<?> getProductsDeleted() {
        try {
            List<Product> products = productsService.getProductsDeleted();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleted products");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Integer id) {
        try {
            Optional<Product> product = productsService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching product by id");
        }
    }

    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<?> getProductBySupplierId(@PathVariable Integer supplierId) {
        try {
            Optional<List<Product>> products = productsService.getProductBySupplierId(supplierId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching products by supplier id");
        }
    }

    @PostMapping()
    public ResponseEntity<?> postProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            // Consider using HttpStatus.CREATED for successful creation
            return ResponseEntity.ok(productsService.postProduct(product));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating product: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Integer id) {
        try {
            Product deletedProduct = productsService.deleteProductById(id);
            return ResponseEntity.ok(deletedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting product");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putProduct(@Valid @RequestBody Product product, @PathVariable Integer id, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            return ResponseEntity.ok(productsService.putProduct(id, product));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while updating product: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/undelete")
    public ResponseEntity<?> undeleteProductById(@PathVariable Integer id) {
        try {
            Product undeletedProduct = productsService.undeleteProductById(id);
            return ResponseEntity.ok(undeletedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while undeleting product");
        }
    }
}
