package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
