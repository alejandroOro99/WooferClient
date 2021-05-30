import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * intercepts exceptions
 */
@Injectable({
  providedIn: 'root',
})
export class AppInterceptorService implements HttpInterceptor {
  /**
   * @ignore
   */
  constructor() {}

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error occurred');
    return throwError(error.error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }
}
