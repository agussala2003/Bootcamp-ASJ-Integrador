package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Category;
import com.bootcamp.backendintegrador.repositories.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category createCategory(Category newCategory) {
        newCategory.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return categoryRepository.save(newCategory);
    }
    
    public Category updateCategory(Integer id, Category updatedCategory) {
    	Optional<Category> optionalCategory = categoryRepository.findById(id);
    	
    	if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setCategoryName(updatedCategory.getCategoryName());
            return categoryRepository.save(category);
        }

        return null;
    }

    public Category deleteCategoryById(Integer categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setActive(false);
            return categoryRepository.save(category);
        }

        return null;
    }

}
