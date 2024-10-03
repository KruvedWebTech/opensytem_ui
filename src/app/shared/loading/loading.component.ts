import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}