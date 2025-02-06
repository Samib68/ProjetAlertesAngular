import { Component } from '@angular/core';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private alertService: AlertService) {}

  sendQuickAlert(): void {
    const quickAlert = {
      id: 0,
      title: 'Alerte Urgente',
      message: 'Alerte d\'urgence : action immédiate requise.',
      type: 'Incendie',  // Ou un autre type par défaut
    };

    this.alertService.sendAlert(quickAlert).subscribe({
      next: () => {
        console.log('Alerte rapide envoyée avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de l\'alerte rapide', err);
      },
    });
  }
}
