import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../../services/alert.service";
import {Alert} from "../../../../models/Alert";

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrl: './alert-management.component.scss'
})
export class AlertManagementComponent implements OnInit {
  alerts: Alert[] = [];
  userId: number = 1; // Exemple : ID de l'utilisateur connecté

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadAlertsByUser();
  }

  loadAlertsByUser(): void {
    this.alertService.getAlertsByUser(this.userId).subscribe((data) => {
      this.alerts = data;
    });
  }

  createAlert(): void {
    const newAlert = {
      title: 'Nouvelle Alerte',
      message: 'Message de l\'alerte',
      user: { id: this.userId }, // L'utilisateur associé
    };
    this.alertService.createAlert(newAlert).subscribe(() => {
      this.loadAlertsByUser();
    });
  }

  deleteAlert(alertId: number): void {
    this.alertService.deleteAlert(alertId).subscribe(() => {
      this.loadAlertsByUser();
    });
  }
}
