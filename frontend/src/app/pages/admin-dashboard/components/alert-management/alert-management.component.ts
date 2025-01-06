import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../../../services/alert.service";
import { Alert } from "../../../../models/Alert";

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.scss'] // Correction du styleUrl
})
export class AlertManagementComponent implements OnInit {
  alerts: Alert[] = [];
  userId: number = 1; // Exemple : ID de l'utilisateur connecté

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadAllAlerts(); // Charge toutes les alertes au démarrage
  }

  // Charge toutes les alertes
  loadAllAlerts(): void {
    this.alertService.getAllAlerts().subscribe((data) => {
      this.alerts = data;
    });
  }

  createAlert(): void {
    const newAlert: Alert = {
      id:1,
      title: 'Nouvelle Alerte',
      message: 'Message de l\'alerte',
      user: this.userId // L'utilisateur associé
    };
    this.alertService.createAlert(newAlert).subscribe(() => {
      this.loadAllAlerts(); // Recharge toutes les alertes
    });
  }

  deleteAlert(alertId: number): void {
    this.alertService.deleteAlert(alertId).subscribe(() => {
      this.loadAllAlerts(); // Recharge toutes les alertes après suppression
    });
  }
}