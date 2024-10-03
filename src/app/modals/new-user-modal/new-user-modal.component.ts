import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent {
  @Input() showModal: boolean = false;

  closeModal() {
    this.showModal = false;
  }

  addUser() {
    // Logic to add user
    console.log('User added');
    this.closeModal();
  }
}
