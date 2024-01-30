package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

}
