package com.bootcamp.backendintegrador.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.errors.ErrorHandler;
import com.bootcamp.backendintegrador.models.Contact;
import com.bootcamp.backendintegrador.services.ContactService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping()
    public ResponseEntity<?> getAllContacts() {
    	try {
            return ResponseEntity.ok(contactService.getAllContacts());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching contacts");
		}

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable Integer id) {
    	try {	
    		return ResponseEntity.ok(contactService.getContactById(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching contacts by id");
		}
    }
    
    @GetMapping("/suppliers/{id}")
    public ResponseEntity<?> getContactBySupplierId(@PathVariable Integer id) {
    	try {
    		return ResponseEntity.ok(contactService.getContactBySupplierId(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching contacts by supplier id");
		}
    }

    @PostMapping()
    public ResponseEntity<?> postContact(@Valid @RequestBody Contact contact, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Contact createdContact = contactService.createContact(contact);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdContact);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putContact(@PathVariable Integer id, @Valid @RequestBody Contact updatedContact, BindingResult bindingResult) {
    	try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            Contact result = contactService.updateContact(id, updatedContact);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found");
            }
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Integer id) {
    	try {
    		contactService.deleteContactById(id);
    		return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting contact");
		}
    }
}
