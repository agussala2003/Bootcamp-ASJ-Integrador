package com.bootcamp.backendintegrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Country;
import com.bootcamp.backendintegrador.repositories.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Optional<Country> getCountryById(Integer id) {
        return countryRepository.findById(id);
    }

    public Country createCountry(Country newCountry) {
        return countryRepository.save(newCountry);
    }

    public void deleteCountryById(Integer id) {
        countryRepository.deleteById(id);
    }
}
