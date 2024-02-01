package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Order;
import com.bootcamp.backendintegrador.models.Status;
import com.bootcamp.backendintegrador.models.Supplier;
import com.bootcamp.backendintegrador.models.User;
import com.bootcamp.backendintegrador.repositories.OrderRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private StatusService statusService;

    @Autowired
    private UserService userService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getActiveOrders() {
        return orderRepository.findByActiveTrue();
    }

    public List<Order> getDeletedOrders() {
        return orderRepository.findByActiveFalse();
    }

    public Optional<Order> getOrderById(Integer orderId) {
        return orderRepository.findById(orderId);
    }

	public List<Order> getOrdersByStatusId(Integer statusId) {
		Status status = statusService.getStatusById(statusId).orElseThrow(() ->
        new EntityNotFoundException("Status with ID " + statusId + " not found"));
		return orderRepository.findByStatus(status);
	}

    
    public Order createOrder(Order newOrder) {
    	
    	List<Order> orders = getAllOrders();
    	
    	for (Order order2 : orders) {
			if(order2.getOrderNumber().equalsIgnoreCase(newOrder.getOrderNumber())) {
				throw new EntityNotFoundException("The order number is used");
			}
		}
    	
    	if(validateOrder(newOrder)) {
            if (newOrder.getCreatedAt() == null) {
                newOrder.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            }

            Supplier orderSupplier = supplierService.getSupplierById(newOrder.getSupplier().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found with ID: " + newOrder.getSupplier().getId()));

            Status orderStatus = statusService.getStatusById(newOrder.getStatus().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Status not found with ID: " + newOrder.getStatus().getId()));

            User orderUser = userService.getUserById(newOrder.getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + newOrder.getUser().getId()));
            
            if(orderStatus.getId() == 2) {
            	newOrder.setActive(false);
            }

            newOrder.setSupplier(orderSupplier);
            newOrder.setStatus(orderStatus);
            newOrder.setUser(orderUser);

            return orderRepository.save(newOrder);
    	}
    	return null;
    }


    public Order desactivateOrderById(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
        	Status updatedStatus = statusService.getStatusById(2).orElseThrow(
             		() -> new EntityNotFoundException("Status not found with ID: " + 2));
            Order orderToDeactivate = optionalOrder.get();
            orderToDeactivate.setStatus(updatedStatus);
            orderToDeactivate.setActive(false);
            orderToDeactivate.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return orderRepository.save(orderToDeactivate);
        }

        return null;
    }

    public Order updateOrder(Integer orderId, Order updatedOrder) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent() && validateOrder(updatedOrder)) {
            Order existingOrder = optionalOrder.get();

            Supplier updatedSupplier = supplierService.getSupplierById(updatedOrder.getSupplier().getId()).orElseThrow(
            		() -> new EntityNotFoundException("Supplier not found with ID: " + updatedOrder.getSupplier().getId()));
            Status updatedStatus = statusService.getStatusById(updatedOrder.getStatus().getId()).orElseThrow(
            		() -> new EntityNotFoundException("Status not found with ID: " + updatedOrder.getStatus().getId()));
            User updatedUser = userService.getUserById(updatedOrder.getUser().getId()).orElseThrow(
            		() -> new EntityNotFoundException("User not found with ID: " + updatedOrder.getUser().getId()));

            existingOrder.setSupplier(updatedSupplier);
            existingOrder.setStatus(updatedStatus);
            existingOrder.setUser(updatedUser);
            existingOrder.setDeliveryDate(updatedOrder.getDeliveryDate());
            existingOrder.setIssuanceDate(updatedOrder.getIssuanceDate());
            existingOrder.setReceptionInfo(updatedOrder.getReceptionInfo());
            existingOrder.setOrderNumber(updatedOrder.getOrderNumber());

            existingOrder.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return orderRepository.save(existingOrder);
        }

        return null;
    }
    
    private boolean validateOrder(Order order) {
    	
        String regex1 = "^[0-9]{1,12}$";
        
    	if(!order.getOrderNumber().matches(regex1)) {
    		return false;
    	}
    	if(order.getReceptionInfo().length() < 15) {
    		return false;
    	}
    	
    	return true;
    }

    public Order undeleteOrderById(Integer orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
        	Status updatedStatus = statusService.getStatusById(3).orElseThrow(
             		() -> new EntityNotFoundException("Status not found with ID: " + 3));
            Order orderToUndelete = optionalOrder.get();

            orderToUndelete.setStatus(updatedStatus);
            orderToUndelete.setActive(true);
            orderToUndelete.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return orderRepository.save(orderToUndelete);
        }

        return null;
    }
}
