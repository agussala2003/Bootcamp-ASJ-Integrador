package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
