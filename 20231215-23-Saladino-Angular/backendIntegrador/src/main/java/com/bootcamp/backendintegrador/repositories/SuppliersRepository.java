package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.SuppliersModel;

public interface SuppliersRepository extends JpaRepository<SuppliersModel, Integer> {
	List<SuppliersModel> findByActiveFalse();
	List<SuppliersModel> findByActiveTrue();
}
