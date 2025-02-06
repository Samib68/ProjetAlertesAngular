import { Component } from '@angular/core';
import {Group} from "../../models/Group";
import {User} from "../../models/User";
import {GroupService} from "../../services/group.service";
import {UserService} from "../../services/user.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-non-diffusion-group-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './non-diffusion-group-management.component.html',
  styleUrl: './non-diffusion-group-management.component.scss'
})
export class NonDiffusionGroupManagementComponent {
  groups: Group[] = [];
  currentGroup: Group = { id: 0, name: '', description: '', diffusion: false };
  isEditing: boolean = false;
  members: User[] = [];
  selectedGroup: Group | null = null;
  availableUsers: User[] = [];
  selectedUsers: number[] = [];

  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadAvailableUsers();
  }

  // Charger uniquement les groupes NON de diffusion
  loadGroups(): void {
    this.groupService.getAllGroups().subscribe((data) => {
      this.groups = data.filter(group => group.diffusion === false);
    });
  }

  loadAvailableUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.availableUsers = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.groupService.updateGroup(this.currentGroup.id, this.currentGroup).subscribe(() => {
        this.loadGroups();
        this.resetForm();
      });
    } else {
      this.groupService.createGroup(this.currentGroup).subscribe(() => {
        this.loadGroups();
        this.resetForm();
      });
    }
  }

  editGroup(group: Group): void {
    this.isEditing = true;
    this.currentGroup = { ...group };
  }

  deleteGroup(groupId: number): void {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentGroup = { id: 0, name: '', description: '', diffusion: false };
  }

  loadGroupMembers(groupId: number): void {
    this.groupService.getGroupMembers(groupId).subscribe((data) => {
      this.members = data;
      this.selectedGroup = this.groups.find((g) => g.id === groupId) || null;
    });
  }

  resetMembersView(): void {
    this.members = [];
    this.selectedGroup = null;
  }

  addMembersToGroup(groupId: number): void {
    this.groupService.addMembersToGroup(groupId, this.selectedUsers).subscribe(() => {
      console.log('Membres ajoutés avec succès');
      this.loadGroupMembers(groupId);
      this.selectedUsers = [];
    });
  }
}
