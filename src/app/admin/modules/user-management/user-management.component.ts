import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonService } from '../../../services/common.service';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';
import { NewUserModalComponent } from '../../../modals/new-user-modal/new-user-modal.component';
import { UserEditModalComponent } from '../../../modals/user-edit-modal/user-edit-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: User[] = [];
  totalUsers: number = 0;
  usersPerPage: number = 8;
  currentPage: number = 1;
  showCreateModal = false; // Control for showing the create user modal
  showEditModal = false;   // Control for showing the edit user modal

  totalPages: number = 0;
  pages: number[] = [];
  displayedUsers: User[] = [];
  private unsubscribe$ = new Subject<void>();
  loading: boolean = false; // Add loading property
  startIndex: number = 0;
  endIndex: number = 0;
  breadcrumbs: Breadcrumb[] = []; // Store breadcrumbs here

  // Sorting properties
  sortField: keyof User = 'createdOn'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

  constructor(private commonService: CommonService, private breadcrumbService: BreadcrumbService ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.setBreadcrumbs();
    // Subscribe to breadcrumb changes
    this.breadcrumbService.breadcrumbs$.pipe(takeUntil(this.unsubscribe$)).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs; // Update breadcrumbs property
    });
  }
  setBreadcrumbs(): void {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Home', url: '/' },
      { label: 'User Management' } // Active breadcrumb, no URL
    ];
    this.breadcrumbService.setBreadcrumbs(breadcrumbs); // Set breadcrumbs in service
  }
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  openEditModal(): void {
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }


  loadUsers(): void {
    this.loading = true;
    this.commonService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: User[]) => {
          this.users = data;
          this.totalUsers = this.users.length;
          this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updatePagination();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
      this.loading = false;
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = Math.min(startIndex + this.usersPerPage, this.totalUsers);
    
    // Sort the users before slicing for display
    this.users.sort((a: User, b: User) => {
      const key = this.sortField as keyof User; // Ensure key is valid
      const aValue = a[key] ?? ''; // Default to empty string if null or undefined
      const bValue = b[key] ?? ''; // Default to empty string if null or undefined

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.displayedUsers = this.users.slice(startIndex, endIndex);
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  editUser(user: User): void {
    this.openEditModal(); // Open edit modal
    console.log('Edit user:', user);
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user with ID:', userId);
    }
  }

  sort(field: keyof User): void {
    // Toggle sort direction
    this.sortDirection = (this.sortField === field && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortField = field;
    
    // Reset pagination and update displayed users
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
    this.updatePagination();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
