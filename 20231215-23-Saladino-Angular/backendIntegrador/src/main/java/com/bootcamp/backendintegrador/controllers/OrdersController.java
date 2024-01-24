package com.bootcamp.backendintegrador.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.backendintegrador.models.ErrorHandler;
import com.bootcamp.backendintegrador.models.OrdersModel;
import com.bootcamp.backendintegrador.services.OrdersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrdersController {

	@Autowired
	OrdersService ordersService;
	
	@GetMapping()
	public ResponseEntity<List<OrdersModel>> getOrders() {
		return new ResponseEntity<List<OrdersModel>>(ordersService.getOrders(),HttpStatus.OK);
	}
	
	@GetMapping("/active")
	public ResponseEntity<List<OrdersModel>> getOrdersActive() {
		return new ResponseEntity<List<OrdersModel>>(ordersService.getOrdersActive(),HttpStatus.OK);
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<OrdersModel>> getOrdersDeleted() {
		return new ResponseEntity<List<OrdersModel>>(ordersService.getOrdersDeleted(),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Object> postProduct(@Valid @RequestBody OrdersModel order, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validation(bindingResult);
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(ordersService.postOrder(order),HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<OrdersModel> deleteOrderById(@PathVariable Integer id) {
		return new ResponseEntity<OrdersModel>(ordersService.deleteOrderById(id),HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> putOrder(@Valid @RequestBody OrdersModel order,@PathVariable Integer id, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorHandler().validation(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
		return new ResponseEntity<>(ordersService.putOrder(id, order), HttpStatus.OK);
	}
}
