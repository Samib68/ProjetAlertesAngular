package edu.miage.springboot.web.rest;

import edu.miage.springboot.dao.entities.GroupEntity;
import edu.miage.springboot.dao.entities.UserEntity;
import edu.miage.springboot.services.interfaces.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    // Récupérer tous les groupes
    @GetMapping
    public ResponseEntity<List<GroupEntity>> getAllGroups() {
        List<GroupEntity> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    // Récupérer un groupe par ID
    @GetMapping("/{id}")
    public ResponseEntity<GroupEntity> getGroupById(@PathVariable Long id) {
        GroupEntity group = groupService.getGroupById(id);
        if (group != null) {
            return ResponseEntity.ok(group);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Créer un nouveau groupe
    @PostMapping
    public ResponseEntity<GroupEntity> createGroup(@RequestBody GroupEntity group) {
        GroupEntity newGroup = groupService.createGroup(group);
        return ResponseEntity.status(HttpStatus.CREATED).body(newGroup);
    }

    // Mettre à jour un groupe existant
    @PutMapping("/{id}")
    public ResponseEntity<GroupEntity> updateGroup(@PathVariable Long id, @RequestBody GroupEntity groupDetails) {
        GroupEntity updatedGroup = groupService.updateGroup(id, groupDetails);
        if (updatedGroup != null) {
            return ResponseEntity.ok(updatedGroup);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Supprimer un groupe
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        boolean deleted = groupService.deleteGroup(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/{groupId}/members")
    public ResponseEntity<Void> addMembersToGroup(
            @PathVariable Long groupId,
            @RequestBody List<Long> userIds
    ) {
        groupService.addMembersToGroup(groupId, userIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{groupId}/members")
    public ResponseEntity<List<UserEntity>> getGroupMembers(@PathVariable Long groupId) {
        Set<UserEntity> members = groupService.getGroupMembers(groupId);
        return ResponseEntity.ok(members.stream().toList());
    }
}
