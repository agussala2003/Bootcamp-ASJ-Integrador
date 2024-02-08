package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.backendintegrador.models.Order;
import com.bootcamp.backendintegrador.models.Status;

public interface OrderRepository extends JpaRepository<Order, Integer>{
	List<Order> findByActiveTrue();
	List<Order> findByActiveFalse();
	List<Order> findByStatus(Status status);
	
	@Query(value = "SELECT TOP 3 p.business_name, COUNT(o.id) AS order_count\r\n"
			+ "FROM orders o \r\n"
			+ "INNER JOIN providers p ON p.id = o.supplier_id\r\n"
			+ "GROUP BY p.business_name\r\n"
			+ "ORDER BY order_count DESC", nativeQuery = true)
	List<Object[]> findTop3Suppliers ();
}
