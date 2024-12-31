import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteGroup(groupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}`);
  }
}
