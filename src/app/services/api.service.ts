import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setData } from '../store/data.actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // JSON server base URL

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  // Fetch data based on selected language
  getData(lang: string = 'en'): Observable<any[]> {
    const url = `${this.baseUrl}/data`; // API endpoint
    const params = new HttpParams().set('lang', lang); // Attach lang as query param

    return this.http.get<any[]>(url, { params }).pipe(
      tap(data => this.store.dispatch(setData({ data }))), // Dispatch data to the store
      catchError(this.handleError) // Handle errors gracefully
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(`Error fetching data: ${error.message}`));
  }
}
