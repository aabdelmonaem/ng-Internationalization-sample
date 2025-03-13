import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class MultiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const localJson = this.http.get(`/assets/i18n/${lang}.json`);
    const apiJson = this.http.get<any[]>(`http://localhost:3000/translations?lang=${lang}`).pipe(
      catchError(() => of([])) // If API fails, return an empty array
    );

    return forkJoin([localJson, apiJson]).pipe(
      map(([local, api]) => {
        const apiTranslations = api.reduce((acc, curr) => {
          acc[curr.key] = curr.message;
          return acc;
        }, {});
        return { ...local, ...apiTranslations }; // Merge both sources
      })
    );
  }
}
