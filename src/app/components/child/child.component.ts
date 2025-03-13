import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() message: string = "";
  @Output() messageEvent = new EventEmitter<string>();

  apiData: any[] = []; // Store API data

  constructor(private languageService: LanguageService, private apiService: ApiService) {
    this.updateTranslations(); // Set initial translation

    // Listen for language changes dynamically
    this.languageService.currentLang$.subscribe(() => {
      this.updateTranslations();
      this.loadData(); // Reload API data on language change
    });
  }

  // Update translations dynamically
  updateTranslations() {
    this.languageService.translate.get('MESSAGE_FROM_CHILD').subscribe((res: string) => {
      this.message = res;
    });
  }

  ngOnInit() {
    this.loadData(); // Fetch data based on language
  }

  sendMessageToParent() {
    const message = this.languageService.translate.instant('MESSAGE_FROM_CHILD'); // Get localized message
    this.messageEvent.emit(message);
  }

  loadData() {
    const currentLang = this.languageService.getCurrentLanguage();
    this.apiService.getData(currentLang).subscribe(
      (response) => (this.apiData = response),
      (error) => console.error('Failed to fetch data:', error)
    );
  }
}
