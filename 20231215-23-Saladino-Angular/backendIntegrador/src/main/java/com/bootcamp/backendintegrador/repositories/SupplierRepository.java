package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
	List<Supplier> findByActiveFalse();
	List<Supplier> findByActiveTrue();
	List<Supplier> findAllByOrderByBusinessNameAsc();
	List<Supplier> findAllByOrderByBusinessNameDesc();
}
