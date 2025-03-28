import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

export interface AuthResponse {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  }
  

@Injectable({
  providedIn: "root"
})
export class AuthService {
    
  private apiUrl = "http://localhost:5000/auth";

  constructor(private http: HttpClient) {}

  register(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
  
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }
}
