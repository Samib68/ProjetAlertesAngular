import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/AuthRequest';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  isLoggedIn(): boolean {
    return this.authService.authenticated();
  }

  logout(): void {
    this.notificationService.disconnect();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
    return this.authService.isAdmin(); // Vérifie si l'utilisateur a un rôle ADMIN
  }
  askPermission(): void{
    this.notificationService.requestNotificationPermission();
    this.notificationService.connect();
}

}
