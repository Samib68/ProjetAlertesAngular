import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../models/Alert';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private apiUrl = 'http://localhost:8080/api/alerts';
    private userId = this.authService.getId();
    constructor(private http: HttpClient, private authService: AuthService) {}

    getAllAlerts(): Observable<Alert[]> {
        return this.http.get<Alert[]>(this.apiUrl);
    }

    getAlertsByUser(userId: number): Observable<Alert[]> {
        return this.http.get<Alert[]>(`${this.apiUrl}/user/${userId}`);
    }

    createAlert(alert: Alert): Observable<Alert> {
        return this.http.post<Alert>(this.apiUrl, alert);
    }

    deleteAlert(alertId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${alertId}`);
    }

    sendAlert(alert: { title: string; message: string; type: string }): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/send?senderId=${this.userId}`, alert);
    }
}