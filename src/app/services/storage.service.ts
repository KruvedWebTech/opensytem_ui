import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly TOKEN_KEY = 'auth-token'; // Key for storing the JWT token

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Save the token to localStorage
  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      console.error('LocalStorage is not available');
    }
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.TOKEN_KEY);
    } else {
      console.error('LocalStorage is not available');
      return null;
    }
  }

  // Decode JWT token and extract the payload
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // JWT structure: header.payload.signature
      const decodedPayload = atob(payload); // Decode the Base64 payload
      return JSON.parse(decodedPayload); // Parse the decoded JSON
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Extract the role from the userData in the token payload
  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded && decoded.userData) {
        const userData = JSON.parse(decoded.userData || '{}');
        return userData.Role || null;
      }
    }
    return null;
  }

  // Clear token from localStorage (on logout)
  clearToken(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.TOKEN_KEY);
    } else {
      console.error('LocalStorage is not available');
    }
  }
  
  private isLocalStorageAvailable(): boolean {
    if (isPlatformBrowser(this.platformId)) {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.error('LocalStorage is not available', e);
            return false;
        }
    }
    console.warn('Not in a browser environment, LocalStorage not available.');
    return false;
}

}
