package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Order;
import com.bootcamp.backendintegrador.models.OrderDetail;
import com.bootcamp.backendintegrador.models.Product;
import com.bootcamp.backendintegrador.repositories.OrderDetailRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailsRepository;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private OrderService orderService;

    public List<OrderDetail> getOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    public Optional<OrderDetail> getOrderDetailsById(Integer id) {
        return orderDetailsRepository.findById(id);
    }

    public List<OrderDetail> createOrderDetails(List<OrderDetail> orderDetailsList) {
        List<OrderDetail> savedOrderDetails = new ArrayList<>();

        orderDetailsList.forEach(orderDetail -> {
        	if(validateOrderDetails(orderDetail)) {
                orderDetail.setCreatedAt(new Timestamp(System.currentTimeMillis()));

                Optional<Product> optionalProduct = productService.getProductById(orderDetail.getProduct().getId());
                Product product = optionalProduct.orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + orderDetail.getProduct().getId()));

                Optional<Order> optionalOrder = orderService.getOrderById(orderDetail.getOrder().getId());
                Order order = optionalOrder.orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderDetail.getOrder().getId()));

                orderDetail.setProduct(product);
                orderDetail.setOrder(order);

                savedOrderDetails.add(orderDetailsRepository.save(orderDetail));
        	}
        });

        return savedOrderDetails;
    }



    public List<OrderDetail> updateOrderDetails(Integer id, List<OrderDetail> updatedOrderDetailsList) {   
    	
        
        Order order = orderService.getOrderById(id).orElseThrow(() ->
        new EntityNotFoundException("Order with ID " + id + " not found"));
        List<OrderDetail> updatedOrderDetails = orderDetailsRepository.findByOrder(order);
        updatedOrderDetails.forEach(item -> {
        	deleteOrderDetails(item.getId());
        });
        
        return createOrderDetails(updatedOrderDetailsList);
    }

    
    public Optional<List<OrderDetail>> getOrderDetailByOrderId(Integer orderId) {
    	Order order = orderService.getOrderById(orderId).orElseThrow(() ->
        new EntityNotFoundException("Order with ID " + orderId + " not found"));
    	return Optional.ofNullable(orderDetailsRepository.findByOrder(order));
    }
    
    private boolean validateOrderDetails(OrderDetail orderDetails) {
    	
        if(orderDetails.getQuantity() < 1) {
        	return false;
        }
        if(orderDetails.getSubtotal() < 1) {
        	return false;
        }
        
        return true;
    }


    public void deleteOrderDetails(Integer id) {
        orderDetailsRepository.deleteById(id);
    }
}
