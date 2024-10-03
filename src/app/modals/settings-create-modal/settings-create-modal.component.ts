import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-create-modal',
  templateUrl: './settings-create-modal.component.html',
  styleUrl: './settings-create-modal.component.scss'
})
export class SettingsCreateModalComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createSetting() {
    // Logic to add user
    this.closeModal();
  }
}
