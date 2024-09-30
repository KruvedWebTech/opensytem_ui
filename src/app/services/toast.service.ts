import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastContainer: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      this.initializeToastContainer();
    }
  }

  // Initialize the toast container only in browser environments
  private initializeToastContainer(): void {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(this.toastContainer);
  }

  showToast(title: string, message: string, type: 'success' | 'error'): void {
    if (!this.isBrowser() || !this.toastContainer) {
      console.warn('Toasts can only be shown in the browser.');
      return;
    }

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = `toast fade show bg-${type}`; // Add 'bg-success' or 'bg-error' based on type
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('data-bs-autohide', 'true'); // Enable auto-hide
    
    toast.innerHTML = `
      <div class="toast-header">
        <span class="avatar avatar-xs me-2" style="background-image: url(./static/avatars/002m.jpg)"></span>
        <strong class="me-auto">${title}</strong>
        <small>${new Date().toLocaleTimeString()}</small>
        <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    // Append toast to the container
    this.toastContainer.appendChild(toast);

    // Automatically remove toast after a few seconds
    setTimeout(() => {
      this.hideToast(toast);
    }, 3000); // Show toast for 3 seconds
  }

  private hideToast(toast: HTMLElement): void {
    toast.classList.remove('show');
    setTimeout(() => {
      if (this.toastContainer && toast) {
        this.toastContainer.removeChild(toast);
      }
    }, 300); // Delay for the fade-out effect
  }

  // Helper method to check if we are in a browser environment
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
