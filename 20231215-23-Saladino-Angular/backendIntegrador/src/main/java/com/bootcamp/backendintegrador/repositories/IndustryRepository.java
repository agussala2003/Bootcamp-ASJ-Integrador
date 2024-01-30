package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Industry;

public interface IndustryRepository extends JpaRepository<Industry, Integer> {

}
