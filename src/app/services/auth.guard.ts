import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.storageService.getToken(); // Get the token instead of the user

    if (!token) {
      // If no token is found, the user is not logged in, redirect to sign-in
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    // Check the user role using the token
    const isAdmin = this.authService.isAdmin(); // Check if the user is an admin
    const url = state.url;

    // Admin route check
    if (url.startsWith('/admin') && !isAdmin) {
      // If the user is not an admin but tries to access admin page, redirect to client page
      this.router.navigate(['/client']);
      return false;
    }

    // Client route check
    if (url.startsWith('/client') && isAdmin) {
      // If the user is an admin but tries to access client page, redirect to admin page
      this.router.navigate(['/admin']);
      return false;
    }

    // If the token exists and passes role-based access control, allow access
    return true;
  }
}
