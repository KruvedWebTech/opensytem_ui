import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';
import { StorageService } from './storage.service'; // Import StorageService for token management
import { Setting } from '../models/setting.model';

//import { Company } from '../models/company.model'; // Assuming you have a Company model

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl; // Base API URL
  router: any;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // getCompanies(): Observable<Company[]> {
  //   return this.http.get<Company[]>(`${this.apiUrl}/companies`).pipe(
  //     catchError(this.handleError)
  //   ); // Adjust the endpoint and handle errors
  // }

  getUsers(): Observable<User[]> {
    const token = this.storageService.getToken(); // Retrieve the token from StorageService
    if (!token) {
      // Handle the absence of the token (e.g., redirect to login)
      console.error('No token found, redirecting to login');
      this.router.navigate(['/login']); // Use the router to navigate to the login page
      return throwError('No token found'); // Throw an error and stop execution
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add the token to the headers
    });
  
    return this.http.get<User[]>(`${this.apiUrl}/Admin/users`, { headers }).pipe(
      catchError(this.handleError) // Handle any potential errors
    );
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error
    return throwError(error); // Rethrow the error for further handling
  }

  getSettings(page: number, pageSize: number = 10): Observable<{ data: Setting[]; total: number }> {
    return this.http.get<{ data: Setting[]; total: number }>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }
  
}

// this.companyId = Number(localStorage.getItem('companyId')) || 1; // Default company ID
//     this.isSuperUser = JSON.parse(localStorage.getItem('isSuperUser')) || false;
//   }

//   getUserManagementData(): Observable<User[]> {
//     if (this.isSuperUser) {
//       return this.http.get<User[]>('/api/users'); // Fetch all users
//     } else {
//       return this.http.get<User[]>(`/api/users?companyId=${this.companyId}`); // Fetch users by company ID
//     }
//   }

//   getSettings(): Observable<Settings> {
//     if (this.isSuperUser) {
//       return this.http.get<Settings>('/api/settings'); // Fetch all settings
//     } else {
//       return this.http.get<Settings>(`/api/settings?companyId=${this.companyId}`); // Fetch settings by company ID
//     }
//   }