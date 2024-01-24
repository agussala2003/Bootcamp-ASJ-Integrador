package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.CategoriesModel;

public interface CategoriesRepository extends JpaRepository<CategoriesModel, Integer> {

}
