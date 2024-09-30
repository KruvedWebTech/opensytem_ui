import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { CommonService } from '../../services/common.service'; // Assuming you have a service for company data
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  showPassword = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  role: string = '';
  company: string = '';
  isActive: boolean = false;
  profilePic: File | null = null; // Store the selected file
  profilePicPreview: string | null = null; // Preview URL for the selected image
  companies: any[] = []; // Array to hold company data
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private commonService: CommonService, // Injecting company service
    private fb: FormBuilder
  ) {
    //this.loadCompanies(); // Load companies on component initialization
  }

  onSubmit(form: any) {
    if (form.valid) {
      const userDetails: any = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        gender: this.gender,
        role: this.role,
        company: this.company,
        isActive: this.isActive,
      };
      if (this.profilePic) {
        userDetails.profilePic = this.profilePic; // Use profilePic if it is valid
      }
      
      // Call your signup service here
      // this.commonService.signUp(userDetails).subscribe(
      //   (response) => {
      //     console.log('Sign-up successful', response);
      //     this.toastService.showToast('Account created successfully!', 'Welcome!', 'success');
      //     this.router.navigate(['/auth/sign-in']); // Navigate to sign-in page after successful sign-up
      //   },
      //   (error) => {
      //     console.error('Sign-up failed:', error);
      //     this.toastService.showToast('Sign-up failed!', 'Please try again.', 'error');
      //   }
      // );
    }
  }
  togglePasswordVisibility(event: Event) {
    event.preventDefault(); // Prevents default behavior like refreshing or navigating
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.profilePic = event.target.files[0]; // Set the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicPreview = reader.result as string; // Create a preview URL
      };
      //reader.readAsDataURL(this.profilePic); // Read the file as data URL
    } else {
      this.profilePic = null; // Reset if no file is selected
      this.profilePicPreview = null; // Reset preview if no file is selected
    }
  }

//   ngOnInit(): void {
//     this.signupForm = this.fb.group({
//         // Other form controls
//         companyId: [null, Validators.required]
//     });

//     this.commonService.getCompanies().subscribe(
//         data => this.companies = data,
//         error => console.error('Error fetching companies', error)
//     );
// }
}
