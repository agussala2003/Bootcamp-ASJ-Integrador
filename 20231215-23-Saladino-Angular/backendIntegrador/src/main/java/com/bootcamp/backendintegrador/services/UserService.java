package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Role;
import com.bootcamp.backendintegrador.models.User;
import com.bootcamp.backendintegrador.repositories.UserRepository;

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
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        Role role = roleService.getRoleById(user.getRole().getId()).orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);
        return userRepository.save(user);
    }

    public User updateUser(Integer id, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            Role role = roleService.getRoleById(updatedUser.getRole().getId()).orElseThrow(() -> new RuntimeException("Role not found"));

            existingUser.setRole(role);
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            return userRepository.save(existingUser);
        }

        return null;
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

}
