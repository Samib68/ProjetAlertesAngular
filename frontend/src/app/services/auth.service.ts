import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/AuthRequest';
import { AuthResponse } from '../models/AuthResponse';
import { Observable } from 'rxjs';
import { geturl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(value: AuthRequest):Observable<AuthResponse> {
    const url=`${geturl()}/api/auth/login`;
    return this.http.post<AuthResponse>(url,value);
  }

  getToken(): string | null {
    return sessionStorage.getItem("ACCESS_TOKEN");
  }
  saveToken(token: string): void {
    sessionStorage.setItem("ACCESS_TOKEN", token);
  }

  authenticated():boolean{
    return !!sessionStorage.getItem("ACCESS_TOKEN");
  }

  logout(): void {
    sessionStorage.removeItem("ACCESS_TOKEN");
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload.role);// Décoder la charge utile du JWT
      return payload.role; // Assurez-vous que le rôle est inclus dans la charge utile du JWT
    }
    return '';
  }

}
