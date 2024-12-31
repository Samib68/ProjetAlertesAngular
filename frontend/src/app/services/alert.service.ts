import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private apiUrl = 'http://localhost:8080/api/alerts';

    constructor(private http: HttpClient) {}

    getAllAlerts(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    deleteAlert(alertId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${alertId}`);
    }
}
