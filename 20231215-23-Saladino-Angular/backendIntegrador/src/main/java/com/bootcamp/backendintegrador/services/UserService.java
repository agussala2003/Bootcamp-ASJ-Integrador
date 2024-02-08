package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.errors.DuplicateException;
import com.bootcamp.backendintegrador.errors.ValidationException;
import com.bootcamp.backendintegrador.models.Role;
import com.bootcamp.backendintegrador.models.User;
import com.bootcamp.backendintegrador.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
    	if(user.isPresent()) {  	
        	return user;
        } else {
        	throw new EntityNotFoundException("User with id " + id + " was not found");
        }
    }

    public User createUser(User user) {
    	List<User> users = getUsers();
    	for (User user2 : users) {
			if(user2.getEmail().equalsIgnoreCase(user.getEmail())) {
				throw new DuplicateException("This email is used");
			}
		}
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        Role role = roleService.getRoleById(user.getRole().getId()).orElseThrow(() -> new EntityNotFoundException("Role not found"));
        user.setRole(role);
        return userRepository.save(user);
    }
    
    public User loginUser(User user) {
    	List<User> users = getUsers();
    	for (User user2 : users) {
			if(user2.getEmail().equals(user.getEmail()) && user2.getPassword().equals(user.getPassword())) {
				return user2;
			}
		}
    	throw new ValidationException("Values Are wrong");
    }

    public User updateUser(Integer id, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            Role role = roleService.getRoleById(updatedUser.getRole().getId()).orElseThrow(() -> new EntityNotFoundException("Role not found"));

            existingUser.setRole(role);
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return userRepository.save(existingUser);
        } else {
        	throw new EntityNotFoundException("User doesn't exists");
        }
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

}
