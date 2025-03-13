import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component'

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ParentComponent } from "./components/parent/parent.component";
import { ChildComponent } from './components/child/child.component';
import { MultiTranslateLoader } from './services/multi-translate-loader';
import { LanguageService } from './services/language.service';

// Function to load translation files
export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateLoader(http);
  }

@NgModule({
    declarations: [
        AppComponent,
        ParentComponent,
        ChildComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    bootstrap: [AppComponent],
    providers: [LanguageService], // ✅ Provide LanguageService here
})
export class AppModule { }
