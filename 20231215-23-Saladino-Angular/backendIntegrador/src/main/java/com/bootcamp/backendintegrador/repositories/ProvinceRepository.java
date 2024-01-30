package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Country;
import com.bootcamp.backendintegrador.models.Province;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
	List<Province> findByCountry(Country country);
}
