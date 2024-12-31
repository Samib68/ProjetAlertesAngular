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
  filteredUsers: User[] = [];
  searchTerm: string = '';
  sortColumn: keyof User | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = [...this.users];
    });
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.roles.some(role => role.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.sort(this.sortColumn);
  }

  sort(column: keyof User | 'roles' | '') {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (column) {
      this.filteredUsers.sort((a, b) => {
        if (column === 'roles') {
          const rolesA = a.roles.map(role => role.name).join(', ');
          const rolesB = b.roles.map(role => role.name).join(', ');
          return this.sortDirection === 'asc'
              ? rolesA.localeCompare(rolesB)
              : rolesB.localeCompare(rolesA);
        } else {
          const valueA = a[column];
          const valueB = b[column];
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return this.sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            return this.sortDirection === 'asc'
                ? valueA - valueB
                : valueB - valueA;
          }
        }
        return 0;
      });
    }
  }

  editUser(user: any): void {
    console.log('Modifier', user);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  getSortIcon(column: string): string {
    if (column !== this.sortColumn) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }


}
