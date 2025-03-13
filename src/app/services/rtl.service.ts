import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtlService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateDirection(language: string) {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    this.renderer.setAttribute(document.documentElement, 'dir', dir);
    this.renderer.setAttribute(document.documentElement, 'lang', language);
     // If needed, apply additional RTL-specific styling
     document.body.classList.toggle('rtl', language === 'ar');
  }
}
