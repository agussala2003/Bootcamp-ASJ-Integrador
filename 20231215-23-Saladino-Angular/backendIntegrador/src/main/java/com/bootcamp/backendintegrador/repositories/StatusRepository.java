package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {
	List<Status> findByStatusName(String statusName);
}
