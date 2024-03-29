package com.bootcamp.backendintegrador.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.errors.ErrorHandler;
import com.bootcamp.backendintegrador.models.OrderDetail;
import com.bootcamp.backendintegrador.services.OrderDetailService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/order-details")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailsService;

    @GetMapping()
    public ResponseEntity<?> getAllOrderDetails() {
        try {
            List<OrderDetail> orderDetails = orderDetailsService.getOrderDetails();
            return ResponseEntity.ok(orderDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching order details");
        }
    }
    
    @GetMapping("/top-products")
    public ResponseEntity<?> getTop3Products() {
        try {
            return ResponseEntity.ok(orderDetailsService.getTop3Products());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching order details");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetailsById(@PathVariable Integer id) {
        try {
            Optional<OrderDetail> orderDetail = orderDetailsService.getOrderDetailsById(id);
            return ResponseEntity.ok(orderDetail);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching order detail by id");
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetailByOrderId(@PathVariable Integer orderId) {
        try {
            Optional<List<OrderDetail>> orderDetails = orderDetailsService.getOrderDetailByOrderId(orderId);
            return ResponseEntity.ok(orderDetails);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching order details by order id");
        }
    }

    @PostMapping()
    public ResponseEntity<?> createOrderDetails(@Valid @RequestBody List<OrderDetail> orderDetails, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                Map<String, String> errors = ErrorHandler.validation(bindingResult);
                return ResponseEntity.badRequest().body(errors);
            }

            List<OrderDetail> createdOrderDetails = orderDetailsService.createOrderDetails(orderDetails);
            return ResponseEntity.ok(createdOrderDetails);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while creating order details");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderDetails(@PathVariable Integer id) {
        try {
            orderDetailsService.deleteOrderDetails(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting order details");
        }
    }
}
