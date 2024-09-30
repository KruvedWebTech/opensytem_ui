import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private TOKEN_KEY = 'auth-token'; // Key for storing the JWT token

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Save the token to local storage
  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      this.safeStorage.setItem(this.TOKEN_KEY, token);
    } else {
      console.error('LocalStorage is not available');
    }
  }

  // Retrieve the token from local storage
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return this.safeStorage.getItem(this.TOKEN_KEY);
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
      if (decoded) {
        const userData = JSON.parse(decoded.userData || '{}');
        return userData.Role || null;
      }
    }
    return null;
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const role = this.getRoleFromToken();
    const isAdmin = role ? (role.toLowerCase() === 'admin' || role.toLowerCase() === 'superadmin' || role.toLowerCase() === 'manager') : false;
    console.log(isAdmin);
    return isAdmin;
  }

  // Check if the user is a normal user
  isUser(): boolean {
    const role = this.getRoleFromToken();
    return role ? (role.toLowerCase() === 'user') : false;
  }

  // Clear token (on logout)
  clearToken(): void {
    if (this.isLocalStorageAvailable()) {
      this.safeStorage.removeItem(this.TOKEN_KEY);
    } else {
      console.error('LocalStorage is not available');
    }
  }

  // Helper method to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && (() => {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    })();
  }

  // SafeLocalStorage class integrated within StorageService
  private safeStorage = new class SafeLocalStorage {
    // Get an item
    getItem(key: string): string | null {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        return null;
      }
    }

    // Set an item
    setItem(key: string, value: string): void {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }

    // Remove an item
    removeItem(key: string): void {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing localStorage item:", error);
      }
    }
  };
}
