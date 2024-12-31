import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../models/AuthRequest';
import { AuthResponse } from '../models/AuthResponse';
import { Observable } from 'rxjs';
import { geturl } from '../../environments/environment';
import {jwtDecode} from "jwt-decode";

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

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const payload: any = jwtDecode(token); // Utilisation de `jwt-decode`
        return payload.roles || []; // Retourne les rôles ou un tableau vide
      } catch (error) {
        console.error('Erreur lors du décodage du JWT:', error);
        return [];
      }
    }
    return [];
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes('ROLE_ADMIN');
  }

}
