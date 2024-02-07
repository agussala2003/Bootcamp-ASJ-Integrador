package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.errors.ValidationException;
import com.bootcamp.backendintegrador.models.Address;
import com.bootcamp.backendintegrador.models.Location;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.repositories.AddressRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private LocationService locationService;

    public List<Address> getAddresses() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(Integer id) {
    	Optional<Address> address = addressRepository.findById(id);
    	if(address.isPresent()) {
    		return address;
    	} else {
    		throw new EntityNotFoundException("The address with id " + id + "was not found");
    	}
    	
    }
    
    public Optional<List<Address>> getAddressBySupplierId(Integer supplierId) {
    	Supplier supplier = supplierService.getSupplierById(supplierId).orElseThrow(() ->
        new EntityNotFoundException("Supplier with ID " + supplierId + " not found"));
    	return Optional.ofNullable(addressRepository.findBySupplier(supplier));
    }

    public Address postAddress(Address address) {

        if (!validateAddressInput(address)) {
            throw new ValidationException("Invalid supplier data provided");
        } else {
        	address.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            Supplier supplier = supplierService.getSupplierById(address.getSupplier().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));

            Location location = locationService.getLocationById(address.getLocation().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Location not found"));

            address.setSupplier(supplier);
            address.setLocation(location);

            return addressRepository.save(address);
        }
    	
    }

    public Address putAddress(Integer id, Address updatedAddress) {
        Optional<Address> existingAddressOptional = addressRepository.findById(id);
        
        if (!validateAddressInput(updatedAddress)) {
            throw new ValidationException("Invalid supplier data provided");
        }

        if (existingAddressOptional.isPresent()) {
            Address existingAddress = existingAddressOptional.get();

            Supplier supplier = supplierService.getSupplierById(updatedAddress.getSupplier().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));

            Location location = locationService.getLocationById(updatedAddress.getLocation().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Location not found"));

            existingAddress.setStreetName(updatedAddress.getStreetName());
            existingAddress.setStreetNumber(updatedAddress.getStreetNumber());
            existingAddress.setLocation(location);
            existingAddress.setSupplier(supplier);
            existingAddress.setPostalCode(updatedAddress.getPostalCode());

            updateTimestamp(existingAddress);

            return addressRepository.save(existingAddress);
        } else {
        	throw new EntityNotFoundException("Address doesn't exists");
        }

    }

    public void deleteAddress(Integer id) {
        addressRepository.deleteById(id);
    }

    private boolean validateAddressInput(Address address) {
        String regex1 = "^[0-9 A-Za-z]{3,50}$";
        String regex2 = "^[0-9]{4,8}$";

        if (!address.getStreetName().matches(regex1)) {
            return false;
        }
        if (!address.getPostalCode().matches(regex2)) {
            return false;
        }
        if (address.getStreetNumber() < 1) {
            return false;
        }
        return true;
    }


    private void updateTimestamp(Address address) {
        address.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
    }
}
