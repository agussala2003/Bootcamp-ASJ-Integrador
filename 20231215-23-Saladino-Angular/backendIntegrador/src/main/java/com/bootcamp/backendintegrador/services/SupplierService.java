package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Industry;
import com.bootcamp.backendintegrador.models.IvaCondition;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.repositories.SupplierRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private IndustryService industryService;

    @Autowired
    private IvaConditionService ivaConditionService;

    public List<Supplier> getSuppliers() {
        return supplierRepository.findAll();
    }

    public List<Supplier> getSuppliersActive() {
        return supplierRepository.findByActiveTrue();
    }

    public List<Supplier> getSuppliersDeleted() {
        return supplierRepository.findByActiveFalse();
    }

    public Optional<Supplier> getSupplierById(Integer id) {
        return supplierRepository.findById(id);
    }

    public Supplier postSupplier(Supplier supplier) {
    	
    	if(validateSupplierInput(supplier)) {
            if (supplier.getCreatedAt() == null) {
                supplier.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            }

            Industry industry = industryService.getIndustryById(supplier.getIndustry().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Industry not found")); // Handle properly

            IvaCondition ivaCondition = ivaConditionService.getIvaConditionById(supplier.getIvaCondition().getId())
                    .orElseThrow(() -> new EntityNotFoundException("IvaCondition not found")); // Handle properly

            supplier.setIndustry(industry);
            supplier.setIvaCondition(ivaCondition);
            

            return supplierRepository.save(supplier);
    	}
    	return null;
    }

    public Supplier deleteSupplier(Integer id) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if (optionalSupplier.isPresent()) {
            Supplier supplier = optionalSupplier.get();
            supplier.setActive(false);
            supplier.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return supplierRepository.save(supplier);
        }

        return null;
    }

    public Supplier putSupplier(Integer id, Supplier updatedSupplier) {
        Optional<Supplier> existingSupplierOptional = supplierRepository.findById(id);

        if (existingSupplierOptional.isPresent() && validateSupplierInput(updatedSupplier)) {
            Supplier existingSupplier = existingSupplierOptional.get();

            Industry industry = industryService.getIndustryById(updatedSupplier.getIndustry().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Industry not found")); // Handle properly

            IvaCondition ivaCondition = ivaConditionService.getIvaConditionById(updatedSupplier.getIvaCondition().getId())
                    .orElseThrow(() -> new EntityNotFoundException("IvaCondition not found")); // Handle properly

            existingSupplier.setIndustry(industry);
            existingSupplier.setBusinessName(updatedSupplier.getBusinessName());
            existingSupplier.setEmail(updatedSupplier.getEmail());
            existingSupplier.setWebsite(updatedSupplier.getWebsite());
            existingSupplier.setPhoneNumber(updatedSupplier.getPhoneNumber());
            existingSupplier.setImage(updatedSupplier.getImage());
            existingSupplier.setIvaCondition(ivaCondition);

            existingSupplier.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return supplierRepository.save(existingSupplier);
        }

        return null;
    }

    public Supplier undeleteSupplierById(Integer id) {
        Optional<Supplier> optionalSupplier = supplierRepository.findById(id);

        if (optionalSupplier.isPresent()) {
            Supplier supplier = optionalSupplier.get();
            supplier.setActive(true);
            supplier.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return supplierRepository.save(supplier);
        }

        return null;
    }
    
    private boolean validateSupplierInput(Supplier supplier) {
    	String regex1 = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    	String regex2 = "^[0-9 A-Z a-z]{3,50}$";
    	String regex3 = "^\\+\\d{1,4}-\\d{1,6}-\\d{4,20}$";
    	String regex4 = "^(ftp|http|https):\\/\\/[^ \"]+$";
    	String regex5 = "^\\d{2}-\\d{8}-\\d{1}$";
    	String regex6 = "^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{4}$";
    	
    	if(!supplier.getBusinessName().matches(regex2)) {
    		return false;
    	}
    	if(!supplier.getCuit().matches(regex5)) {
    		return false;
    	}
    	if(!supplier.getEmail().matches(regex1)) {
    		return false;
    	}
    	if(!supplier.getImage().matches(regex4)) {
    		return false;
    	}
    	if(!supplier.getPhoneNumber().matches(regex3)) {
    		return false;
    	}
    	if(!supplier.getSupplierCode().matches(regex6)) {
    		return false;
    	}
    	if(!supplier.getWebsite().matches(regex4)) {
    		return false;
    	}
    	
    	return true;
    }
}
