package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.Order;
import com.bootcamp.backendintegrador.models.Status;

public interface OrderRepository extends JpaRepository<Order, Integer>{
	List<Order> findByActiveTrue();
	List<Order> findByActiveFalse();
	List<Order> findByStatus(Status status);
}
