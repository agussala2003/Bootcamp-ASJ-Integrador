package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Industry;
import com.bootcamp.backendintegrador.repositories.IndustryRepository;

@Service
public class IndustryService {

    @Autowired
    private IndustryRepository industryRepository;

    public List<Industry> getAllIndustries() {
        return industryRepository.findAll();
    }

    public Optional<Industry> getIndustryById(Integer id) {
        return industryRepository.findById(id);
    }

    public Industry createIndustry(Industry newIndustry) {
        newIndustry.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return industryRepository.save(newIndustry);
    }
    
    public Industry updateIndustry(Integer id, Industry updatedIndustry) {
    	Optional<Industry> optionalIndustry = industryRepository.findById(id);

        if (optionalIndustry.isPresent()) {
            Industry industry = optionalIndustry.get();
            industry.setIndustryName(updatedIndustry.getIndustryName());
            return industryRepository.save(industry);
        }

        return null;
    }

    public Industry deleteIndustryById(Integer id) {
        Optional<Industry> optionalIndustry = industryRepository.findById(id);

        if (optionalIndustry.isPresent()) {
            Industry industry = optionalIndustry.get();
            industry.setActive(false);
            return industryRepository.save(industry);
        }

        return null;
    }
}
