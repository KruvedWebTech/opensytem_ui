import { Component } from '@angular/core';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrl: './user-edit-modal.component.scss'
})
export class UserEditModalComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editUser() {
    // Logic to add user
    this.closeModal();
  }
}
