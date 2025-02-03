import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stompClient: Client | null = null;
  constructor(private authService : AuthService) {
  }

  connect(): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket ,
      connectHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      },
      reconnectDelay: 5000, // Reconnexion automatique
      debug: (str) => console.log(str), // Logs
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connected');

      // S'abonner aux notifications
      this.stompClient?.subscribe(`/queue/alerts-user${this.authService.getUsername()}`, (message) => {
        const alert = JSON.parse(message.body);
        console.log('Alerte reçue : ', alert);
        this.showNotification(alert.type + ' : ' + alert.title, alert.message);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    this.stompClient?.deactivate();
    console.log('WebSocket disconnected');
  }

  private showNotification(title: string, body: string): void {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  requestNotificationPermission(): void {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        console.log(`Notification permission: ${permission}`);
      });
    }
  }
}
