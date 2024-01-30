package com.bootcamp.backendintegrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Country;
import com.bootcamp.backendintegrador.models.Province;
import com.bootcamp.backendintegrador.repositories.ProvinceRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;
    
    @Autowired
    private CountryService countryService;

    public List<Province> getProvinces() {
        return provinceRepository.findAll();
    }

    public Optional<Province> getProvinceById(Integer id) {
        return provinceRepository.findById(id);
    }
    
    public List<Province> getProvincesByCountryId(Integer countryId) {
        Country country = countryService.getCountryById(countryId).orElseThrow(() ->
                new EntityNotFoundException("Country with ID " + countryId + " not found"));

        return provinceRepository.findByCountry(country);
    }


    public Province createProvince(Province province) {
        Country country = countryService.getCountryById(province.getCountry().getId()).orElseThrow(() ->
                new EntityNotFoundException("Country with ID " + province.getCountry().getId() + " not found"));

        province.setCountry(country);
        return provinceRepository.save(province);
    }

    public Province updateProvince(Integer id, Province updatedProvince) {
        Optional<Province> existingProvinceOptional = provinceRepository.findById(id);

        if (existingProvinceOptional.isPresent()) {
            Province existingProvince = existingProvinceOptional.get();

            Country country = countryService.getCountryById(updatedProvince.getCountry().getId()).orElseThrow(() ->
                    new EntityNotFoundException("Country with ID " + updatedProvince.getCountry().getId() + " not found"));

            existingProvince.setCountry(country);
            existingProvince.setProvinceName(updatedProvince.getProvinceName());

            return provinceRepository.save(existingProvince);
        } else {
            throw new EntityNotFoundException("Province not found with ID: " + id);
        }
    }

    public void deleteProvince(Integer id) {
        provinceRepository.deleteById(id);
    }
}
