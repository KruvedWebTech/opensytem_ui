import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../shared/loading/loading.service'; // Import LoadingService
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.invalid) {
      return;
    }
    
    const credentials = { email: this.email, password: this.password };

    // Show loading indicator before API call
    this.loadingService.show(); 

    this.authService.login(credentials).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        this.toastService.showToast('Login Successful!', 'You have successfully logged in.', 'success');
        
        // Access the token from response.data
        const token = response.data;

        if (token) {
          this.storageService.setToken(token);

          // Check if the logged-in user is an admin based on the token
          if (this.authService.isAdmin()) {
            console.log('User is an admin. Redirecting to admin page...');
            this.router.navigate(['admin']);
            this.loadingService.hide();
          } else {
            console.log('User is not an admin. Redirecting to client page...');
            this.router.navigate(['client']);
            this.loadingService.hide();
          }
        } else {
          console.error('No token received in the response');
          this.loadingService.hide();
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.toastService.showToast('Login Failed!', 'Please check your credentials.', 'error');
        this.loadingService.hide();
      },
      // Complete function to hide loading indicator
      () => {
        this.loadingService.hide(); // Hide loading indicator after the request completes
      }
    );
  }
}
