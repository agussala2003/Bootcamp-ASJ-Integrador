package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.ProductsModel;
import com.bootcamp.backendintegrador.repositories.ProductsRepository;

@Service
public class ProductsService {

	@Autowired
	ProductsRepository productsRepository;
	
	public List<ProductsModel> getProducts(){
		return productsRepository.findAll();
	}
	
	public List<ProductsModel> getProductsActive(){
		return productsRepository.findByActiveTrue();
	}
	
	public List<ProductsModel> getProductsDeleted(){
		return productsRepository.findByActiveFalse();
	}
	
	public Optional<ProductsModel> getProductById(Integer id){
		return productsRepository.findById(id);
	}
	
	public ProductsModel postProduct(ProductsModel product) {
		
		if (product.getCreatedAt() == null) {
			product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }

        return productsRepository.save(product);
	}
	
	public ProductsModel deleteProductById(Integer id){
		Optional<ProductsModel> optionalProduct = productsRepository.findById(id);
		
		if(optionalProduct.isPresent()) {
			ProductsModel product = optionalProduct.get();
			product.setActive(false);
			product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return productsRepository.save(product);
		}
		
		return null;
	}
	
	public ProductsModel putProduct(Integer id, ProductsModel product){
		Optional<ProductsModel> optionalProduct = productsRepository.findById(id);
		
		if(optionalProduct.isPresent()) {
			ProductsModel existingProduct = optionalProduct.get();
			
			existingProduct.setDescription(product.getDescription());
			existingProduct.setImageUrl(product.getImageUrl());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setProductName(product.getProductName());
			existingProduct.setCategoryId(product.getCategoryId());

			existingProduct.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return productsRepository.save(existingProduct);
		}
		
		return null;
	}
}
