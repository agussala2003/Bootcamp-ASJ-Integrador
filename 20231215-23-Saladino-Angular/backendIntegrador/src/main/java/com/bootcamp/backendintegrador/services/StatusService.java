package com.bootcamp.backendintegrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.Status;
import com.bootcamp.backendintegrador.repositories.StatusRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    public List<Status> getStatuses() {
        return statusRepository.findAll();
    }

    public Optional<Status> getStatusById(Integer id) {
    	Optional<Status> status = statusRepository.findById(id);
    	if(status.isPresent()) {
    		return status;
    	} else {
        	throw new EntityNotFoundException("Status with id " + id + " was not found");
        }
    }

    public Status createStatus(Status status) {
        return statusRepository.save(status);
    }

    public Status updateStatus(Integer id, Status updatedStatus) {
        Optional<Status> existingStatusOptional = statusRepository.findById(id);

        if (existingStatusOptional.isPresent()) {
            Status existingStatus = existingStatusOptional.get();
            existingStatus.setStatusName(updatedStatus.getStatusName());
            return statusRepository.save(existingStatus);
        } else {
        	throw new EntityNotFoundException("An error has occurred");
        }
    }
    
    public List<Status> findByStatusName(String string) {
    	return statusRepository.findByStatusName(string);
    }

    public void deleteStatus(Integer id) {
        statusRepository.deleteById(id);
    }
}
