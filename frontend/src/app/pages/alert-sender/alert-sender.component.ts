import { Component } from '@angular/core';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-alert-sender',
  templateUrl: './alert-sender.component.html',
  styleUrl: './alert-sender.component.scss'
})
export class AlertSenderComponent {
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: string = '';
  alertTypes: string[] = ['Incendie', 'Inondation', 'Canicule'];
  constructor(private alertService: AlertService) {}

  sendAlert(): void {
    const alert = {
      id: 0,
      title: this.alertTitle,
      message: this.alertMessage,
      type: this.alertType,
    };

    this.alertService.sendAlert(alert).subscribe({
      next: () => {
        console.log('Alerte envoyée avec succès');
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de l\'alerte', err);
      },
    });
  }

  private resetForm(): void {
    this.alertTitle = '';
    this.alertMessage = '';
    this.alertType = '';
  }
}
