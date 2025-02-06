import { Component } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/auth.service";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-alert-history',
  standalone: true,
  imports: [
    DatePipe,CommonModule
  ],
  templateUrl: './alert-history.component.html',
  styleUrl: './alert-history.component.scss'
})
export class AlertHistoryComponent {
  alerts: any[] = [];
  isLoading = true;

  constructor(
      private alertService: AlertService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  private loadAlerts(): void {
    const userId = this.authService.getId();
    if (typeof userId === "number") {
      this.alertService.getAlertsByUser(userId).subscribe({
        next: (alerts) => {
          this.alerts = alerts;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des alertes', err);
          this.isLoading = false;
        }
      });
    }
  }
}
