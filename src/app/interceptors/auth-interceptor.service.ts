import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (token) {
      // Clone the request and add the authorization header
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest).pipe(
        catchError(this.handleError)
      );
    } else {
      return next.handle(req).pipe(
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error response
    if (error.status === 401) {
      // Redirect to login or handle unauthorized access
      console.error('Unauthorized access');
    }
    return throwError(() => new Error(error.message));
  }
}
