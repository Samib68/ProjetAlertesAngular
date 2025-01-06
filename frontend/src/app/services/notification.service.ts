import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  socketClient: any =null;
  constructor(private authService : AuthService) {}

  connect(username: string): void {
    let ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    this.socketClient.connect({}, () => {
      console.log('WebSocket connected');
      // S'abonner aux notifications

      this.socketClient?.subscribe(`/topic/alerts/${username}`, (message:any) => {
        const alert = JSON.parse(message.body);
        console.log(`Alerte reçue : ${alert.title} - ${alert.message}`);
        this.showNotification(alert.title, alert.message);
      });
    });
  }

  disconnect(): void {
    this.socketClient?.disconnect(() => {
      console.log('WebSocket disconnected');
    });
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

