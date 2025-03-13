import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en'); // Default language
  currentLang$ = this.currentLang.asObservable(); // Observable for language changes

  constructor(public translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');

    // Load saved language from localStorage or fallback to default
    const savedLang = localStorage.getItem('lang') || 'en';
    if (savedLang) {
      this.changeLanguage(savedLang);
    }
  }

  /**
   * Change language globally
   */
  changeLanguage(lang: string) {
    this.translate.use(lang); // Change language in ngx-translate
    this.currentLang.next(lang); // Notify subscribers
    localStorage.setItem('lang', lang); // Persist language preference
  }

  /**
   * Get the current selected language
   */
  getCurrentLanguage(): string {
    return this.currentLang.getValue();
  }

  /**
   * Get a translated string instantly
   */
  translateKey(key: string): string {
    return this.translate.instant(key);
  }
}
