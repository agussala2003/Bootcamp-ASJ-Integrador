package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.ProductsModel;

public interface ProductsRepository extends JpaRepository<ProductsModel, Integer> {
	List<ProductsModel> findByActiveFalse();
	List<ProductsModel> findByActiveTrue();
}
