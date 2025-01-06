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

  deleteAlert(alertId: number): void {
    this.alertService.deleteAlert(alertId).subscribe(() => {
      this.loadAllAlerts(); // Recharge toutes les alertes après suppression
    });
  }
}