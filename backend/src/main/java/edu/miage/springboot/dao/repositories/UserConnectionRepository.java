package edu.miage.springboot.dao.repositories;

import edu.miage.springboot.dao.entities.UserConnectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserConnectionRepository extends JpaRepository<UserConnectionEntity, Integer> {
}
