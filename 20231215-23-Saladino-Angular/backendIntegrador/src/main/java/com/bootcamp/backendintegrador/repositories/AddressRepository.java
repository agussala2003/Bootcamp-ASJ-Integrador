package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Address;
import com.bootcamp.backendintegrador.models.Supplier;


public interface AddressRepository extends JpaRepository<Address, Integer> {
	List<Address> findBySupplier(Supplier supplier);
}
