package edu.miage.springboot.dao.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class AlertEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String message;
    private LocalDateTime timestamp;
    public AlertEntity() {
        this.title = "default";
        this.message = "default";
        this.timestamp = LocalDateTime.now();
    }

    public AlertEntity( String title, String message, UserEntity user) {
        this.title = title;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.user=user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user; //l'utilisateur qui envoie l'alerte

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
