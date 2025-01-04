package edu.miage.springboot.services.impl;

import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.entities.UserEntity;
import edu.miage.springboot.dao.repositories.GroupRepository;
import edu.miage.springboot.dao.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.miage.springboot.services.interfaces.GroupService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<GroupEntity> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public GroupEntity getGroupById(Long id) {
        return groupRepository.findById(id).orElse(null);
    }

    @Override
    public GroupEntity createGroup(GroupEntity group) {
        return groupRepository.save(group);
    }

    @Override
    public GroupEntity updateGroup(Long id, GroupEntity groupDetails) {
        Optional<GroupEntity> groupOptional = groupRepository.findById(id);
        if (groupOptional.isPresent()) {
            GroupEntity group = groupOptional.get();
            group.setName(groupDetails.getName());
            group.setDescription(groupDetails.getDescription());
            group.setUsers(groupDetails.getUsers());
            return groupRepository.save(group);
        }
        return null;
    }

    @Override
    public boolean deleteGroup(Long id) {
        if (groupRepository.existsById(id)) {
            groupRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Transactional
    @Override
    public void addMembersToGroup(Long groupId, List<Long> userIds) {
        Optional<GroupEntity> groupOptional = groupRepository.findById(groupId);
        if (groupOptional.isPresent()) {
            GroupEntity group = groupOptional.get();
            List<UserEntity> usersToAdd = userRepository.findAllById(userIds);

            // Ajoute les nouveaux membres et met à jour la relation inverse
            for (UserEntity user : usersToAdd) {
                group.getUsers().add(user);
                user.getGroups().add(group); // Met à jour l'autre côté de la relation
            }

            groupRepository.save(group); // Sauvegarde les changements
        } else {
            throw new EntityNotFoundException("Group not found with ID: " + groupId);
        }

    }

    public Set<UserEntity> getGroupMembers(Long groupId) {
        Optional<GroupEntity> groupOptional = groupRepository.findById(groupId);
        return groupOptional.map(GroupEntity::getUsers).orElse(Collections.emptySet());
    }
}
