package edu.miage.springboot.services.impl;


import edu.miage.springboot.dao.entities.AlertEntity;
import edu.miage.springboot.dao.repositories.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {
    private final AlertRepository alertRepository;
    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public void sendAlert(AlertEntity alert) {
        alertRepository.save(alert);
    }

    public List<AlertEntity> getAllAlerts() {
        return alertRepository.findAll();
    }
}
