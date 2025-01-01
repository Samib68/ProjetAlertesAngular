package edu.miage.springboot.dao.repositories;

import edu.miage.springboot.dao.entities.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
}
