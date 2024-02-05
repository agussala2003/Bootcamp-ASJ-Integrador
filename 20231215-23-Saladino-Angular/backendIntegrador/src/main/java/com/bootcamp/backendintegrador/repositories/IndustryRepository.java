package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Industry;

public interface IndustryRepository extends JpaRepository<Industry, Integer> {
	List<Industry> findByActiveTrue();
	List<Industry> findByActiveFalse();
}
