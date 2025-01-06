package edu.miage.springboot.web.rest;


import edu.miage.springboot.dao.entities.AlertEntity;
import edu.miage.springboot.services.impl.AlertServiceImpl;
import edu.miage.springboot.services.interfaces.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    @Autowired
    private AlertServiceImpl alertService;

    @GetMapping
    public ResponseEntity<List<AlertEntity>> getAllAlerts() {
        List<AlertEntity> alerts = alertService.getAllAlerts();
        return ResponseEntity.ok(alerts);
    }


    // Créer une nouvelle alerte
    @PostMapping
    public ResponseEntity<AlertEntity> createAlert(@RequestBody AlertEntity alert) {
        AlertEntity newAlert = alertService.createAlert(alert);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAlert);
    }

    // Supprimer une alerte par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable Long id) {
        boolean deleted = alertService.deleteAlert(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendAlert(
            @RequestBody AlertEntity alert,
            @RequestParam Long senderId
    ) {
        alertService.sendAlertToGroups(alert, senderId);
        return ResponseEntity.ok().build();
    }

}
