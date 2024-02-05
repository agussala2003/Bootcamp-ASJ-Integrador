package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Category;
import com.bootcamp.backendintegrador.repositories.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer categoryId) {
    	Optional<Category> category = categoryRepository.findById(categoryId);
    	if(category.isPresent()) {
    		return category;
    	} else {
    		throw new EntityNotFoundException("Category with Id " + categoryId + " was not found");
    	}
    }
    
    public List<Category> getActiveCategories() {
        return categoryRepository.findByActiveTrue();
    }
    
    public List<Category> getDeletedCategories() {
        return categoryRepository.findByActiveFalse();
    }

    public Category createCategory(Category newCategory) {
    	List<Category> allCategories = getAllCategories();
    	for (Category category : allCategories) {
			if(category.getCategoryName().equalsIgnoreCase(newCategory.getCategoryName())) {
				throw new EntityNotFoundException("Category already exists");
			}
		}
        newCategory.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return categoryRepository.save(newCategory);
    }
    
    public Category updateCategory(Integer id, Category updatedCategory) {
    	Optional<Category> optionalCategory = categoryRepository.findById(id);
    	
    	List<Category> allCategories = getAllCategories();
    	for (Category category : allCategories) {
			if(category.getCategoryName().equalsIgnoreCase(updatedCategory.getCategoryName())) {
				throw new EntityNotFoundException("Category already exists");
			}
		}
    	if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setCategoryName(updatedCategory.getCategoryName());
            return categoryRepository.save(category);
        } else {	
        	throw new EntityNotFoundException("An error has ocurred");
        }
    	
    }

    public Category deleteCategoryById(Integer categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setActive(false);
            return categoryRepository.save(category);
        } else {
        	throw new EntityNotFoundException("An error has ocurred");
        }

    }
    
    public Category undeleteCategoryById(Integer id) {
    	Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setActive(true);
            return categoryRepository.save(category);
        } else {
        	throw new EntityNotFoundException("An error has occurred");
        }
    }

}
