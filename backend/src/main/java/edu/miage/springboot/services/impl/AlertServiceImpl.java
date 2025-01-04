package edu.miage.springboot.services.impl;

import edu.miage.springboot.dao.entities.AlertEntity;
import edu.miage.springboot.dao.repositories.AlertRepository;
import edu.miage.springboot.services.interfaces.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertServiceImpl implements AlertService {
    @Autowired
    private AlertRepository alertRepository;

    @Override
    public List<AlertEntity> getAllAlerts() {
        return alertRepository.findAll();
    }

    @Override
    public List<AlertEntity> getAlertsByUser(Long userId) {
        return alertRepository.findByUserId(userId);
    }

    @Override
    public AlertEntity createAlert(AlertEntity alert) {
        return alertRepository.save(alert);
    }

    @Override
    public boolean deleteAlert(Long id) {
        if (alertRepository.existsById(id)) {
            alertRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
