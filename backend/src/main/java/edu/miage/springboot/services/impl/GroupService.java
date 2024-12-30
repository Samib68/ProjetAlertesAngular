package edu.miage.springboot.services.impl;

import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.repositories.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public List<GroupEntity> getAllGroups() {
        return groupRepository.findAll();
    }
}
