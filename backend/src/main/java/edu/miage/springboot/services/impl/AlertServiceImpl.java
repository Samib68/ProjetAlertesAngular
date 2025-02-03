package edu.miage.springboot.services.impl;

import edu.miage.springboot.dao.entities.AlertEntity;
import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.entities.UserEntity;
import edu.miage.springboot.dao.repositories.AlertRepository;
import edu.miage.springboot.dao.repositories.UserRepository;
import edu.miage.springboot.services.interfaces.AlertService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AlertServiceImpl implements AlertService {
    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private UserRepository userRepository;

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

    @Override
    public void sendAlertToGroups(AlertEntity alert, Long senderId) {
        Optional<UserEntity> senderOptional = userRepository.findById(senderId);
        if (senderOptional.isPresent()) {
            UserEntity sender = senderOptional.get();
            Set<GroupEntity> senderGroups = sender.getGroups();

            // Récupérer tous les utilisateurs des groupes du sender
            Set<UserEntity> recipients = senderGroups.stream()
                    .flatMap(group -> group.getUsers().stream())
                    .collect(Collectors.toSet());

            // Retirer l’émetteur des destinataires
            recipients.remove(sender);

            // Envoi d'alertes
            recipients.forEach(user -> {
                System.out.println("📢 Tentative d'envoi à : " + user.getUsername());
                System.out.println("Alerte envoyée à " + user.getUsername() + ": " + alert.getTitle());
                messagingTemplate.convertAndSendToUser(
                        user.getUsername(),
                        "/queue/alerts",
                        alert
                );
            });

            // Sauvegarder l'alerte
            alert.setUser(sender);
            alertRepository.save(alert);
        } else {
            throw new EntityNotFoundException("Émetteur introuvable avec l'ID : " + senderId);
        }

}}
