package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findByActiveTrue();
	List<Category> findByActiveFalse();
}
