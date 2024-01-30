package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Contact;
import com.bootcamp.backendintegrador.models.Supplier;


public interface ContactRepository extends JpaRepository<Contact, Integer> {
	List<Contact> findBySupplier(Supplier supplier);
}
