import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtlService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    // Create a renderer instance
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Method to update the text direction based on the language
  updateDirection(language: string) {
    // Determine the direction based on the language
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    // Set the 'dir' attribute on the document element
    this.renderer.setAttribute(document.documentElement, 'dir', dir);
    // Set the 'lang' attribute on the document element
    this.renderer.setAttribute(document.documentElement, 'lang', language);
    // If needed, apply additional RTL-specific styling
    document.body.classList.toggle('rtl', language === 'ar');
  }
}
