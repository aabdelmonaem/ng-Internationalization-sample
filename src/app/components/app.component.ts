import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RtlService } from '../services/rtl.service';
import { LanguageService } from '../services/language.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private languageService: LanguageService, private rtlService: RtlService) {
    const currentLang = this.languageService.getCurrentLanguage();
    this.setLanguage(currentLang);
  }


  setLanguage(language: string) {
    this.languageService.changeLanguage(language); // ✅ Use LanguageService to update language
    this.rtlService.updateDirection(language); // ✅ Update RTL based on language
  }
}
