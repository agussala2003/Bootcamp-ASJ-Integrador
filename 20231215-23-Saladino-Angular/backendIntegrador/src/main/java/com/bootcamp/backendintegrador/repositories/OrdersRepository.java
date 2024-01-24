package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.backendintegrador.models.OrdersModel;

public interface OrdersRepository extends JpaRepository<OrdersModel, Integer>{
	List<OrdersModel> findByActiveTrue();
	List<OrdersModel> findByActiveFalse();
}
