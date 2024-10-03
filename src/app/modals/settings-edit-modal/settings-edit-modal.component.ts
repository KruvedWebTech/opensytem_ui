import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-edit-modal',
  templateUrl: './settings-edit-modal.component.html',
  styleUrl: './settings-edit-modal.component.scss'
})
export class SettingsEditModalComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editSetting() {
    // Logic to add user
    this.closeModal();
  }
}
