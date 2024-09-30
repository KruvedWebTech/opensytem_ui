import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service'; // Import ToastServic
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'] // Notice `styleUrls` instead of `styleUrl`
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  submitted: boolean = false; // Add a flag to track form submission

  constructor(
    private authService: AuthService, // Inject AuthService for login
    private storageService: StorageService, // Inject StorageService for token management
    private router: Router, // Inject Router for navigation
    private toastService: ToastService // Inject ToastService
  ) {}

  onSubmit(form: NgForm) {
    this.submitted = true; // Set submitted to true when the form is submitted

    if (form.invalid) {
      return; // Prevent submission if the form is invalid
    }
    const credentials = { email: this.email, password: this.password };
    
    this.authService.login(credentials).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        this.toastService.showToast('Login Successful!', 'You have successfully logged in.', 'success');
        // Access the token from response.data
      const token = response.data;

  
        // Assuming the response contains a JWT token
        if ( token) {
          // Save token to storage after successful login
          this.storageService.setToken(token);

          // Check if the logged-in user is an admin based on the token
          if (this.authService.isAdmin()) {
            console.log('User is an admin. Redirecting to admin page...');
            // Redirect to the admin page
            this.router.navigate(['admin']);
          } else {
            console.log('User is not an admin. Redirecting to client page...');
            // Redirect to the client page
            this.router.navigate(['client']);
          }
        } else {
          console.error('No token received in the response');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.toastService.showToast('Login Failed!', 'Please check your credentials.', 'error');
      }
    );
  }
}
