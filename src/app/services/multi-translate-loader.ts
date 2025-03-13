import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class MultiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  // Method to get translations for a given language
  getTranslation(lang: string): Observable<any> {
    // Fetch local JSON translation file
    const localJson = this.http.get(`/assets/i18n/${lang}.json`);
    
    // Fetch translations from API, handle errors by returning an empty array
    const apiJson = this.http.get<any[]>(`http://localhost:3000/translations?lang=${lang}`).pipe(
      catchError(() => of([])) // If API fails, return an empty array
    );

    // Combine both local and API translations
    return forkJoin([localJson, apiJson]).pipe(
      map(([local, api]) => {
        // Reduce API translations to a key-value object
        const apiTranslations = api.reduce((acc, curr) => {
          acc[curr.key] = curr.message;
          return acc;
        }, {});
        // Merge both sources and return the combined translations
        return { ...local, ...apiTranslations };
      })
    );
  }
}
