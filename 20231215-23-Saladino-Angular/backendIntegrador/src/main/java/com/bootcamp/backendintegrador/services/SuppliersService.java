package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.SuppliersModel;
import com.bootcamp.backendintegrador.repositories.SuppliersRepository;

@Service
public class SuppliersService {

	@Autowired
	SuppliersRepository suppliersRepository;
	
	public List<SuppliersModel> getSuppliers() {
		return suppliersRepository.findAll();
	}
	
	public List<SuppliersModel> getSuppliersActive() {
		return suppliersRepository.findByActiveTrue();
	}
	
	public List<SuppliersModel> getSuppliersDeleted() {
		return suppliersRepository.findByActiveFalse();
	}
	
	public Optional<SuppliersModel> getSupplierById(Integer id) {
		return suppliersRepository.findById(id);
	}
	
	 public SuppliersModel postSupplier(SuppliersModel supplier) {
		 
	        if (supplier.getCreatedAt() == null) {
	            supplier.setCreatedAt(new Timestamp(System.currentTimeMillis()));
	        }

	        return suppliersRepository.save(supplier);
	    }
	
	 public SuppliersModel deleteSupplier(Integer id) {
	        Optional<SuppliersModel> optionalSupplier = suppliersRepository.findById(id);

	        if (optionalSupplier.isPresent()) {
	            SuppliersModel supplier = optionalSupplier.get();
	            supplier.setActive(false);
	            supplier.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
	            return suppliersRepository.save(supplier);
	        }

	        return null;
	    }

	
	 public SuppliersModel putSupplier(Integer id, SuppliersModel supplier) {
	        Optional<SuppliersModel> existingSupplierOptional = suppliersRepository.findById(id);

	        if (existingSupplierOptional.isPresent()) {
	            SuppliersModel existingSupplier = existingSupplierOptional.get();

	            existingSupplier.setIndustry(supplier.getIndustry());
	            existingSupplier.setBusinessName(supplier.getBusinessName());
	            existingSupplier.setEmail(supplier.getEmail());
	            existingSupplier.setWebsite(supplier.getWebsite());
	            existingSupplier.setPhoneNumber(supplier.getPhoneNumber());
	            existingSupplier.setImage(supplier.getImage());
	            existingSupplier.setIvaCondition(supplier.getIvaCondition());

	            existingSupplier.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

	            return suppliersRepository.save(existingSupplier);
	        }

	        return null;
	    }

}
