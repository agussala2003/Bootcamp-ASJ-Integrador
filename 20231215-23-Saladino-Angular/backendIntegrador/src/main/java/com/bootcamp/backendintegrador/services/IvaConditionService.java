package com.bootcamp.backendintegrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.backendintegrador.models.IvaCondition;
import com.bootcamp.backendintegrador.repositories.IvaConditionRepository;

@Service
public class IvaConditionService {

    @Autowired
    private IvaConditionRepository ivaConditionsRepository;

    public List<IvaCondition> getIvaConditions() {
        return ivaConditionsRepository.findAll();
    }

    public Optional<IvaCondition> getIvaConditionById(Integer id) {
        return ivaConditionsRepository.findById(id);
    }

    public IvaCondition postIvaCondition(IvaCondition ivaCondition) {
        return ivaConditionsRepository.save(ivaCondition);
    }

    public void deleteIvaCondition(Integer id) {
        ivaConditionsRepository.deleteById(id);
    }
}
