package edu.miage.springboot.web.rest;


import edu.miage.springboot.dao.entities.AlertEntity;
import edu.miage.springboot.services.impl.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public List<AlertEntity> getAllAlerts() {
        return alertService.getAllAlerts();
    }

    @PostMapping
    public ResponseEntity<Void> createAlert(@RequestBody AlertEntity alert) {
        alertService.sendAlert(alert);
        return ResponseEntity.ok().build();
    }
}
