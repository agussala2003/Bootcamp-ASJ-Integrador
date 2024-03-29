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
    
    public List<Object[]> getTop3Products() {
        return orderDetailsRepository.findTop3Products();
    }

    public Optional<OrderDetail> getOrderDetailsById(Integer id) {
    	Optional<OrderDetail> orderDetail = orderDetailsRepository.findById(id);
       	if(orderDetail.isPresent()) {
       		return orderDetail;
       	} else {
       		throw new EntityNotFoundException("Order Detail with id " + id + " was not found");
       	}
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
