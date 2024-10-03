import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service'; // Import StorageService for token management
import { LoginResponse } from '../models/login-response.model'; // Import your response model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Login method that sends credentials and stores the received token
  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, credentials).pipe(
      map((response) => {
        // Assuming the response contains a JWT token
        if (response && typeof response.data == 'string') {
          // Store the token in local storage using StorageService
          this.storageService.setToken(response.data);
        }
        return response; // Forward the response
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error); // Handle error appropriately
      })
    );
  }

  // Signup method (unchanged)
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/sign-up`, data);
  }

  // Check if the logged-in user is an admin
  isAdmin(): boolean {
    // Use StorageService to get the role from the token
    const role = this.storageService.getRoleFromToken();
    // Check if the role is admin or other elevated roles
    return role === 'Admin' || role === 'admin' || role === 'Superadmin' || role === 'manager';
  }

  // Optional: Check if the user is logged in by checking if a token exists
  isLoggedIn(): boolean {
    return !!this.storageService.getToken(); // Return true if token exists
  }

  // Logout method to clear the token
  logout(): void {
    this.storageService.clearToken(); // Remove the token from storage
  }
}
