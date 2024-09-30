import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router'; // Correct import
import { LoadingService } from './shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Correct property: styleUrls
})
export class AppComponent {
  title = 'opensystem_ui';

  constructor(private router: Router, private loadingService: LoadingService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading bar on route start
        this.loadingService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        // Hide loading bar on route end, cancel, or error
        this.loadingService.hide();
      }
    });
  }
}
