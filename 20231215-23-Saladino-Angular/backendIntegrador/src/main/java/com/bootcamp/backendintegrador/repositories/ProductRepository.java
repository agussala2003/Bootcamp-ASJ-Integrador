package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Category;
import com.bootcamp.backendintegrador.models.Product;
import com.bootcamp.backendintegrador.models.Supplier;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByActiveFalse();
	List<Product> findByActiveTrue();
	List<Product> findBySupplier(Supplier supplier);
	List<Product> findByCategory(Category category);
	List<Product> findAllByOrderByPriceDesc();
	List<Product> findAllByOrderByPriceAsc();
 }
