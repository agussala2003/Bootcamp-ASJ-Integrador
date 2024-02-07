package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Contact;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.repositories.ContactRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SupplierService supplierService;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Integer id) {
    	Optional<Contact> contact = contactRepository.findById(id);
    	if(contact.isPresent()) {
    		return contact; 
    	} else {
    		throw new EntityNotFoundException("Contact with " + id + " was not found");
    	}
    }
    
    public Optional<List<Contact>> getContactBySupplierId(Integer supplierId) {
    	Supplier supplier = supplierService.getSupplierById(supplierId).orElseThrow(() ->
        new IllegalArgumentException("Supplier with ID " + supplierId + " not found"));
        return Optional.ofNullable(contactRepository.findBySupplier(supplier));
    }


    public Contact createContact(Contact newContact) {
    	
        if(validateContactInput(newContact)) {
            newContact.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            Supplier supplier = supplierService.getSupplierById(newContact.getSupplier().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));

            newContact.setSupplier(supplier);

            return contactRepository.save(newContact);
        } else {
    		throw new EntityNotFoundException("An error has ocurred");
    	}
    }

    public Contact updateContact(Integer id, Contact updatedContact) {
        Optional<Contact> existingContactOptional = contactRepository.findById(id);

        if (existingContactOptional.isPresent() && validateContactInput(updatedContact)) {
            Contact existingContact = existingContactOptional.get();
            
            Supplier supplier = supplierService.getSupplierById(updatedContact.getSupplier().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));

            existingContact.setFirstName(updatedContact.getFirstName());
            existingContact.setLastName(updatedContact.getLastName());
            existingContact.setEmail(updatedContact.getEmail());
            existingContact.setPhoneNumber(updatedContact.getPhoneNumber());
            existingContact.setRole(updatedContact.getRole());
            existingContact.setSupplier(supplier);

            updateTimestamp(existingContact);

            return contactRepository.save(existingContact);
        } else {
    		throw new EntityNotFoundException("Contact with " + id + " was not found");
    	}
    }

    public void deleteContactById(Integer id) {
        contactRepository.deleteById(id);
    }

    private boolean validateContactInput(Contact contact) {
        String regex1 = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        String regex2 = "^[0-9 A-Za-z]{3,50}$";
        String regex3 = "^\\+\\d{1,4}-\\d{1,6}-\\d{4,20}$";

        if (!contact.getEmail().matches(regex1)) {
            return false;
        }
        if (!contact.getFirstName().matches(regex2)) {
            return false;
        }
        if (!contact.getLastName().matches(regex2)) {
            return false;
        }
        if (!contact.getRole().matches(regex2)) {
            return false;
        }
        if (!contact.getPhoneNumber().matches(regex3)) {
            return false;
        }

        return true;
    }

    private void updateTimestamp(Contact contact) {
        contact.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    }
}
