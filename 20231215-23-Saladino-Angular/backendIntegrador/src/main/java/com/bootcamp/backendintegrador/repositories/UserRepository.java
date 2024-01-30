package com.bootcamp.backendintegrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
