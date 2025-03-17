import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setLanguage } from '../store/language.actions';

@Injectable({
  providedIn: 'root'
})
export class RtlService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private store: Store<AppState>) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.store.select('language').subscribe(language => {
      this.updateDirection(language);
    });
  }

  updateDirection(language: string) {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(document.documentElement, 'dir', dir);
    this.renderer.setAttribute(document.documentElement, 'lang', language);
    // If needed, apply additional RTL-specific styling
    document.body.classList.toggle('rtl', language === 'ar');
  }

  changeLanguage(language: string) {
    this.store.dispatch(setLanguage({ language }));
  }
}
