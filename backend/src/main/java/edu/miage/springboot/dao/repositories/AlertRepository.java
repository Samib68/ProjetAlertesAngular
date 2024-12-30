package edu.miage.springboot.dao.repositories;

import edu.miage.springboot.dao.entities.AlertEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<AlertEntity, Integer> {
}
