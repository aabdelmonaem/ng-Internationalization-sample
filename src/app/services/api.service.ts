import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // JSON server base URL

  constructor(private http: HttpClient) {}

  // Fetch data based on selected language
  getData(lang: string = 'en'): Observable<any[]> {
    const url = `${this.baseUrl}/data`; // API endpoint
    const params = new HttpParams().set('lang', lang); // Attach lang as query param

    return this.http.get<any[]>(url, { params }).pipe(
      catchError(this.handleError) // Handle errors gracefully
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(`Error fetching data: ${error.message}`));
  }
}
