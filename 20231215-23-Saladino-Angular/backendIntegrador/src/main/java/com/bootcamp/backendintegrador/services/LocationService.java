package com.bootcamp.backendintegrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.errors.ValidationException;
import com.bootcamp.backendintegrador.models.Location;
import com.bootcamp.backendintegrador.models.Province;
import com.bootcamp.backendintegrador.repositories.LocationRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationsRepository;
    
    @Autowired
    private ProvinceService provinceService;

    public List<Location> getLocations() {
        return locationsRepository.findAll();
    }

    public Optional<Location> getLocationById(Integer id) {
    	Optional<Location> location = locationsRepository.findById(id);
    	if(location.isPresent()) {
    		return location;
    	} else {
    		throw new EntityNotFoundException("Location with id " + id + " was not found");
    	}
    }

    public Location postLocation(Location location) {
    	
    	if(!validateLocationInput(location)) {
    		throw new ValidationException("Invalid location data provided");
    	}
    	
    	Province province = provinceService.getProvinceById(location.getProvince().getId())
    				.orElseThrow(() -> new EntityNotFoundException("Province not found"));
    		
    	location.setProvince(province);
    		
    	return locationsRepository.save(location);
    }

    public Location putLocation(Integer id, Location location) {
        Optional<Location> existingLocationOptional = locationsRepository.findById(id);

        if(!validateLocationInput(location)) {
    		throw new ValidationException("Invalid location data provided");
    	}
        
        if (existingLocationOptional.isPresent()) {
            Location existingLocation = existingLocationOptional.get();

            Province province = provinceService.getProvinceById(location.getProvince().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Province not found"));

            existingLocation.setProvince(province);
            existingLocation.setLocationName(location.getLocationName());
            
            return locationsRepository.save(existingLocation);
        } else {
    		throw new EntityNotFoundException("Location doesn't exists");
    	}
    }
    
    private boolean validateLocationInput(Location location) {
        String regex = "^[0-9 A-Za-z]{3,50}$";
    	if(!location.getLocationName().matches(regex)) {
    		return false;
    	}
    	return true;
    }

    public void deleteLocation(Integer id) {
        locationsRepository.deleteById(id);
    }
}
