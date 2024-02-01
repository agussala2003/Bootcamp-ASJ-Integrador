package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Category;
import com.bootcamp.backendintegrador.models.Product;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.repositories.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productsRepository;
	
	@Autowired
	private SupplierService supplierService;
	
	@Autowired 
	private CategoryService categoryService;
	
	public List<Product> getProducts(){
		return productsRepository.findAll();
	}
	
	public List<Product> getProductsActive(){
		return productsRepository.findByActiveTrue();
	}
	
	public List<Product> getProductsDeleted(){
		return productsRepository.findByActiveFalse();
	}
	
	public Optional<Product> getProductById(Integer id){
		return productsRepository.findById(id);
	}
	
	public List<Product> getProductsByPriceAsc(){
		return productsRepository.findAllByOrderByPriceAsc();
	}
	
	public List<Product> getProductsByPriceDesc(){
		return productsRepository.findAllByOrderByPriceDesc();
	}
	
	public Optional<List<Product>> getProductBySupplierId(Integer supplierId) {
		Supplier supplier = supplierService.getSupplierById(supplierId).orElseThrow(() ->
        new EntityNotFoundException("Supplier with ID " + supplierId + " not found"));
		return Optional.ofNullable(productsRepository.findBySupplier(supplier));
	}
	
	public Optional<List<Product>> getProductByCategoryId(Integer categoryId) {
		Category category = categoryService.getCategoryById(categoryId).orElseThrow(() ->
        new EntityNotFoundException("Category with ID " + categoryId + " not found"));
		return Optional.ofNullable(productsRepository.findByCategory(category));
	}
	
	public Product postProduct(Product product) {
		
		List<Product> products = getProducts();
    	
    	for (Product product2 : products) {
			if(product2.getSku().equalsIgnoreCase(product.getSku())) {
				throw new EntityNotFoundException("The sku is used");
			}
		}
		
		if(validateProductInput(product)) {
			if (product.getCreatedAt() == null) {
				product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
	        }
			
			Optional<Supplier> supplier = Optional.ofNullable(supplierService.getSupplierById(product.getSupplier().getId()).orElseThrow(() ->
	        new EntityNotFoundException("Supplier with ID " + product.getSupplier().getId() + " not found")));
			Optional<Category> category = Optional.ofNullable(categoryService.getCategoryById(product.getCategory().getId()).orElseThrow(() ->
	        new EntityNotFoundException("Supplier with ID " + product.getCategory().getId() + " not found")));
			
			product.setSupplier(supplier.get());
			product.setCategory(category.get());
			return productsRepository.save(product);
		}
		
		return null;
	}
	
	public Product deleteProductById(Integer id){
		Optional<Product> optionalProduct = productsRepository.findById(id);
		
		if(optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			product.setActive(false);
			product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return productsRepository.save(product);
		}
		
		return null;
	}
	
	public Product putProduct(Integer id, Product product){
		Optional<Product> optionalProduct = productsRepository.findById(id);
		
		if(optionalProduct.isPresent() && validateProductInput(product)) {
			Product existingProduct = optionalProduct.get();
			
			Optional<Supplier> supplier = Optional.ofNullable(supplierService.getSupplierById(product.getSupplier().getId()).orElseThrow(() ->
	        new EntityNotFoundException("Supplier with ID " + product.getSupplier().getId() + " not found")));
			Optional<Category> category = Optional.ofNullable(categoryService.getCategoryById(product.getCategory().getId()).orElseThrow(() ->
	        new EntityNotFoundException("Supplier with ID " + product.getCategory().getId() + " not found")));
			
			existingProduct.setSku(product.getSku());
			existingProduct.setSupplier(supplier.get());
			existingProduct.setCategory(category.get());
			existingProduct.setDescription(product.getDescription());
			existingProduct.setImageUrl(product.getImageUrl());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setProductName(product.getProductName());

			existingProduct.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

	        return productsRepository.save(existingProduct);
		}
		return null;
	}
	
	public Product undeleteProductById(Integer id) {
        Optional<Product> optionalProduct = productsRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            product.setActive(true); 
            
            product.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return productsRepository.save(product);
        }

        return null;
    }
	
	private boolean validateProductInput(Product product) {
		
		String regex1 = "^[0-9]{8}$";
		String regex2 = "^(ftp|http|https):\\/\\/[^ \"]+$";
		String regex3 = "^[0-9 A-Z a-z]{3,50}$";
		
		if(product.getDescription().length() < 15) {
			return false;
		}
		if(!product.getImageUrl().matches(regex2)) {
			return false;
		}
		if(product.getPrice() < 0) {
			return false;
		}
		if(!product.getProductName().matches(regex3)) {
			return false;
		}
		if(!product.getSku().matches(regex1)) {
			return false;
		}
		
		return true;
	}
}
