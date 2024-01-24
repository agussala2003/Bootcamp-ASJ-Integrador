package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.CategoriesModel;
import com.bootcamp.backendintegrador.repositories.CategoriesRepository;

@Service
public class CategoriesService {

	@Autowired
	CategoriesRepository categoriesRepository;
	
	public List<CategoriesModel> getCategories() {
		return categoriesRepository.findAll();
	}
	
	public Optional<CategoriesModel> getCategoryById(Integer id) {
		return categoriesRepository.findById(id);
	}
	
	public CategoriesModel postCategory(CategoriesModel category) {
		category.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		return categoriesRepository.save(category);
	}
	
	public CategoriesModel deleteCategory(Integer id) {
	    Optional<CategoriesModel> optionalCategory = categoriesRepository.findById(id);

	    if (optionalCategory.isPresent()) {
	    	categoriesRepository.deleteById(id);
	    	return optionalCategory.get();
	    }

	    return null;
	}
	
}
