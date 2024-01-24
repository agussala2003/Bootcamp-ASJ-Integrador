package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.OrdersModel;
import com.bootcamp.backendintegrador.repositories.OrdersRepository;

@Service
public class OrdersService {

	@Autowired
	OrdersRepository ordersRepository;
	
	public List<OrdersModel> getOrders() {
		return ordersRepository.findAll();
	}
	
	public List<OrdersModel> getOrdersActive() {
		return ordersRepository.findByActiveTrue();
	}
	
	public List<OrdersModel> getOrdersDeleted() {
		return ordersRepository.findByActiveFalse();
	}
	
	public Optional<OrdersModel> getOrderById(Integer id) {
		return ordersRepository.findById(id);
	}
	
	public OrdersModel postOrder(OrdersModel order) {
		
		if(order.getCreatedAt() == null) {
			order.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		}
		
		return ordersRepository.save(order);
	}
	
	public OrdersModel deleteOrderById(Integer id) {
		Optional<OrdersModel> optionalOrder = ordersRepository.findById(id);
		
		if(optionalOrder.isPresent()) {
			OrdersModel order = optionalOrder.get();
			order.setActive(false);
			order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
			return ordersRepository.save(order);
		}
		
		return null;
	}
	
	public OrdersModel putOrder(Integer id, OrdersModel order) {
		Optional<OrdersModel> optionalOrder = ordersRepository.findById(id);
		
		if(optionalOrder.isPresent()) {
			OrdersModel existingOrder = optionalOrder.get();
			
			existingOrder.setDeliveryDate(order.getDeliveryDate());
			existingOrder.setIssuanceDate(order.getIssuanceDate());
			existingOrder.setOrderStatus(order.getOrderStatus());
			existingOrder.setReceptionInfo(order.getReceptionInfo());
			existingOrder.setSupplierId(order.getSupplierId());
			
			existingOrder.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
			
			return ordersRepository.save(existingOrder);
		}
		
		return null;
	}
}
