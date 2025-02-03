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

  }

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
