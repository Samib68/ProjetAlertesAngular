import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../../../services/group.service";
import {Group} from "../../../../models/Group";

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
})
export class GroupManagementComponent implements OnInit {
  groups:Group[]= [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  editGroup(group: any): void {
    console.log('Modifier', group);
  }

  deleteGroup(groupId: number): void {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
  }
}
