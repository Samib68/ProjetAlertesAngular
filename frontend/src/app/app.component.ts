import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {NotificationService} from "./services/notification.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'frontend';
  constructor(private router: Router, private notificationService: NotificationService, private authService: AuthService) {}
  ngOnInit(): void {
    this.notificationService.requestNotificationPermission();
    const username = this.authService.getUsername(); // Remplacez par l'authentification actuelle
    if (username != null) {
      this.notificationService.connect(username);
    }
  }

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
