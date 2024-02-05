package com.bootcamp.backendintegrador.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Role;
import com.bootcamp.backendintegrador.repositories.RoleRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Integer id) {
    	Optional<Role> role = roleRepository.findById(id);
    	if(role.isPresent()) {
    		return role;
    	} else {
        	throw new EntityNotFoundException("Role with id " + id + " was not found");
        }
    }

    public Role createRole(Role role) {
        role.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return roleRepository.save(role);
    }

    public Role updateRole(Integer id, Role updatedRole) {
        Optional<Role> existingRoleOptional = roleRepository.findById(id);

        if (existingRoleOptional.isPresent()) {
            Role existingRole = existingRoleOptional.get();
            existingRole.setRoleName(updatedRole.getRoleName());
            existingRole.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return roleRepository.save(existingRole);
        } else {
        	throw new EntityNotFoundException("An error has occurred");
        }
    }

    public void deleteRole(Integer id) {
        roleRepository.deleteById(id);
    }
}
