import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../../../services/alert.service";
import {Alert} from "../../../../models/Alert";

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrl: './alert-management.component.scss'
})
export class AlertManagementComponent implements OnInit{
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getAllAlerts().subscribe((data) => {
      this.alerts = data;
    });
  }

  editAlert(alert: any): void {
    console.log('Modifier', alert);
  }

  deleteAlert(alertId: number): void {
    this.alertService.deleteAlert(alertId).subscribe(() => {
      this.loadAlerts();
    });
  }
}
