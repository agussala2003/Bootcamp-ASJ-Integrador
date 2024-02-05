package com.bootcamp.backendintegrador.controllers;

import java.util.Map;

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

import com.bootcamp.backendintegrador.models.Category;
import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.services.CategoryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<?> getCategories() {
    	try {
    		return ResponseEntity.ok(categoryService.getAllCategories());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching categories");
		}
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Integer id) {
    	try {
            return ResponseEntity.ok(categoryService.getCategoryById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching categories");
		}
    }
    
    @GetMapping("/active")
    public ResponseEntity<?> getActiveCategories() {
    	try {
    		return ResponseEntity.ok(categoryService.getActiveCategories());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching categories");
		}
    }
    
    @GetMapping("/deleted")
    public ResponseEntity<?> getDeletedCategories() {
    	try {
    		return ResponseEntity.ok(categoryService.getDeletedCategories());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching categories");
		}
    }

    @PostMapping()
    public ResponseEntity<?> postCategory(@Valid @RequestBody Category category, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }
            Category createdCategory = categoryService.createCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory (@PathVariable Integer id, @Valid @RequestBody Category category, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }
            Category updatedCategory = categoryService.updateCategory(id,category);
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedCategory);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating industry: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
    	try {
            categoryService.deleteCategoryById(id);
            return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching deleting categories");
		}
    }
    
    @PatchMapping("/undelete/{id}")
    public ResponseEntity<?> undeleteCategoryById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(categoryService.undeleteCategoryById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while undeleting order by id");
        }
    }
}

