import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Group} from "../models/Group";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  updateGroup(groupId: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${groupId}`, group);
  }

  deleteGroup(groupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}`);
  }

  getGroupMembers(groupId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${groupId}/members`);
  }

  addMembersToGroup(groupId: number, userIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${groupId}/members`, userIds);
  }
}
