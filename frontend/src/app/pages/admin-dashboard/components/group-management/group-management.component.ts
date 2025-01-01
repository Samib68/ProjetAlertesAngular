import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../../services/group.service';
import { Group } from '../../../../models/Group';
import {User} from "../../../../models/User";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
})
export class GroupManagementComponent implements OnInit {
  groups: Group[] = [];
  currentGroup: Group = { id: 0, name: '', description: '' }; // Modèle pour le formulaire
  isEditing: boolean = false; // État pour différencier création et modification
  members: User[] = [];
  selectedGroup: Group | null = null;
  availableUsers: User[] = []; // Tous les utilisateurs disponibles
  selectedUsers: number[] = [];

  constructor(private groupService: GroupService,
               private userService: UserService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  // Charger tous les groupes
  loadGroups(): void {
    this.groupService.getAllGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  // Soumettre le formulaire (créer ou modifier)
  onSubmit(): void {
    if (this.isEditing) {
      // Modification d'un groupe existant
      this.groupService.updateGroup(this.currentGroup.id, this.currentGroup).subscribe(() => {
        this.loadGroups();
        this.resetForm();
      });
    } else {
      // Création d'un nouveau groupe
      this.groupService.createGroup(this.currentGroup).subscribe(() => {
        this.loadGroups();
        this.resetForm();
      });
    }
  }

  // Modifier un groupe
  editGroup(group: Group): void {
    this.isEditing = true;
    this.currentGroup = { ...group }; // Copier les données du groupe sélectionné
  }

  // Supprimer un groupe
  deleteGroup(groupId: number): void {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.isEditing = false;
    this.currentGroup = { id: 0, name: '', description: '' };
  }
  loadGroupMembers(groupId: number): void {
    this.groupService.getGroupMembers(groupId).subscribe((data) => {
      this.members = data;
      this.selectedGroup = this.groups.find((g) => g.id === groupId) || null;
    });
  }

  // Réinitialiser la vue des membres
  resetMembersView(): void {
    this.members = [];
    this.selectedGroup = null;
  }

  loadAvailableUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.availableUsers = data;
    });
  }

  addMembersToGroup(groupId: number): void {
    this.groupService.addMembersToGroup(groupId, this.selectedUsers).subscribe(() => {
      console.log('Membres ajoutés avec succès');
      this.loadGroupMembers(groupId); // Recharge les membres du groupe
      this.selectedUsers = []; // Réinitialise la sélection
    });
  }
}
