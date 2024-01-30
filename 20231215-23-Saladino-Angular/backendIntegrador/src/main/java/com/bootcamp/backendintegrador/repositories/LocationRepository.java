package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Location;

public interface LocationRepository extends JpaRepository<Location, Integer>{

}
