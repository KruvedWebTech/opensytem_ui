import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Observable to track loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  // Start loading
  show() {
    this.loadingSubject.next(true);
  }

  // Stop loading
  hide() {
    this.loadingSubject.next(false);
  }
}
