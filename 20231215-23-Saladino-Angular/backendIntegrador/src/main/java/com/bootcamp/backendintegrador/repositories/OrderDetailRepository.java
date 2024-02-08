package com.bootcamp.backendintegrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.backendintegrador.models.Order;
import com.bootcamp.backendintegrador.models.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	List<OrderDetail> findByOrder(Order order);
	
	@Query(value = "SELECT TOP 3 p.product_name, SUM(od.quantity) AS order_details_count\r\n"
			+ "FROM order_details od\r\n"
			+ "INNER JOIN products p ON p.id = od.product_id\r\n"
			+ "GROUP BY p.product_name\r\n"
			+ "ORDER BY order_details_count DESC", nativeQuery = true)
	List<Object[]> findTop3Products ();
}
