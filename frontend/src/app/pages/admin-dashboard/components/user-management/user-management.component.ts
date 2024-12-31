import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {Folder} from "../../../../models/Folder";
import {User} from "../../../../models/User";


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users:User[]=[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: any): void {
    console.log('Modifier', user);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
