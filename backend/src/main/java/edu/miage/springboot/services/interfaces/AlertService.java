package edu.miage.springboot.services.interfaces;

import edu.miage.springboot.dao.entities.AlertEntity;

import java.util.List;

public interface AlertService {
    List<AlertEntity> getAllAlerts();
    List<AlertEntity> getAlertsByUser(Long userId);
    AlertEntity createAlert(AlertEntity alert);
    boolean deleteAlert(Long id);
}
