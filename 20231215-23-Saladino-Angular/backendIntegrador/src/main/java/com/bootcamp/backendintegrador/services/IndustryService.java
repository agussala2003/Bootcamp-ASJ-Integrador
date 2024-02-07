package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.errors.DuplicateException;
import com.bootcamp.backendintegrador.models.Industry;
import com.bootcamp.backendintegrador.repositories.IndustryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class IndustryService {

    @Autowired
    private IndustryRepository industryRepository;

    public List<Industry> getAllIndustries() {
        return industryRepository.findAll();
    }

    public Optional<Industry> getIndustryById(Integer id) {
    	Optional<Industry> industry = industryRepository.findById(id);
    	if(industry.isPresent()) {
    		return industry;
    	} else {
        	throw new EntityNotFoundException("Industry doesn't exists");
        }
    }
    
    public List<Industry> getActiveIndustries() {
        return industryRepository.findByActiveTrue();
    }
    
    public List<Industry> getDeletedIndustries() {
        return industryRepository.findByActiveFalse();
    }
    

    public Industry createIndustry(Industry newIndustry) {
    	List<Industry> allIndustries = getAllIndustries();
    	for (Industry industry : allIndustries) {
			if(industry.getIndustryName().equalsIgnoreCase(newIndustry.getIndustryName())) {
				throw new DuplicateException("Industry Already exists");
			}
		}
        newIndustry.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return industryRepository.save(newIndustry);
    }
    
    public Industry updateIndustry(Integer id, Industry updatedIndustry) {
    	Optional<Industry> optionalIndustry = industryRepository.findById(id);

    	List<Industry> allIndustries = getAllIndustries();
    	for (Industry industry : allIndustries) {
			if(industry.getIndustryName().equalsIgnoreCase(updatedIndustry.getIndustryName())) {
				throw new DuplicateException("Industry Already exists");
			}
		}
    	
        if (optionalIndustry.isPresent()) {
            Industry industry = optionalIndustry.get();
            industry.setIndustryName(updatedIndustry.getIndustryName());
            return industryRepository.save(industry);
        } else {
        	throw new EntityNotFoundException("Industry doesn't exists");
        }
    }

    public Industry deleteIndustryById(Integer id) {
        Optional<Industry> optionalIndustry = industryRepository.findById(id);

        if (optionalIndustry.isPresent()) {
            Industry industry = optionalIndustry.get();
            industry.setActive(false);
            return industryRepository.save(industry);
        } else {
        	throw new EntityNotFoundException("Industry doesn't exists");
        }
    }
    
    public Industry undeleteIndustryById(Integer id) {
    	Optional<Industry> optionalIndustry = industryRepository.findById(id);

        if (optionalIndustry.isPresent()) {
            Industry industry = optionalIndustry.get();
            industry.setActive(true);
            return industryRepository.save(industry);
        } else {
        	throw new EntityNotFoundException("Industry doesn't exists");
        }
    }
}
