import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Setting } from '../../../models/setting.model'; // Adjust the path as necessary

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  breadcrumbs = [{ label: 'Home', url: '/' }, { label: 'Settings', url: null }];
  displayedSettings: Setting[] = [];
  totalSettings = 0;
  currentPage = 1;
  totalPages = 1;
  startIndex = 0;
  endIndex = 0;
pages: any;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.commonService.getSettings(this.currentPage).subscribe((response) => {
      this.displayedSettings = response.data; // Adjust as per your API response
      this.totalSettings = response.total; // Adjust as per your API response
      this.updatePagination();
    });
  }

  updatePagination() {
    this.startIndex = (this.currentPage - 1) * 10; // Assuming 10 entries per page
    this.endIndex = Math.min(this.startIndex + this.displayedSettings.length, this.totalSettings);
    this.totalPages = Math.ceil(this.totalSettings / 10);
  }

  sort(field: string) {
    // Implement sorting logic here
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadSettings();
  }

  editSetting(setting: Setting) {
    // Implement edit logic here
  }

  deleteSetting(id: number) {
    // Implement delete logic here
  }
}
