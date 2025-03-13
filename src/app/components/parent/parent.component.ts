import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  parentMessage: string = '';
  childMessage: string = '';

  constructor(private languageService: LanguageService) {
    this.updateTranslations(); // Set initial translation

    // Listen for language changes dynamically
    this.languageService.currentLang$.subscribe(() => {
      this.updateTranslations();
    });
  }

  // Update translations dynamically
  updateTranslations() {
    this.languageService.translate.get('HELLO_FROM_PARENT').subscribe((res: string) => {
      this.parentMessage = res;
    });

    this.languageService.translate.get('MESSAGE_FROM_CHILD').subscribe((res: string) => {
      this.childMessage = res;
    });
  }

  receiveMessage($event: string) {
    this.childMessage = $event;
  }
}
