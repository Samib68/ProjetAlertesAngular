package edu.miage.springboot.services.interfaces;

import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.entities.UserEntity;

import java.util.List;
import java.util.Set;

public interface GroupService {
    List<GroupEntity> getAllGroups();
    GroupEntity getGroupById(Long id);
    GroupEntity createGroup(GroupEntity group);
    GroupEntity updateGroup(Long id, GroupEntity groupDetails);
    boolean deleteGroup(Long id);
    void addMembersToGroup(Long groupId, List<Long> userIds);
    Set<UserEntity> getGroupMembers(Long groupId);
}
