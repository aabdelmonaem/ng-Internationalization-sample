# ng-Internationalization-sample

## Purpose
This application demonstrates how to implement internationalization (i18n) in an Angular application. It includes examples of loading translations from both local JSON files and an external API, as well as handling right-to-left (RTL) text direction for languages such as Arabic.

## Features
- Load translations from local JSON files.
- Fetch translations from an external API.
- Merge local and API translations.
- Update text direction based on the selected language.
- Apply RTL-specific styling when necessary.
- Manage language and data state using NgRx Store.

## Getting Started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Install json-server

Run the following command: `npm install -g json-server`

## Running json-server 

Run `json-server --watch db.json --port 3000`

## Using NgRx Store
This application uses NgRx Store to manage the state of the selected language and fetched data.

### Language State Management
The `RtlService` is responsible for updating the text direction and language attribute based on the selected language. It uses NgRx Store to dispatch and listen for language changes.

### Data State Management
The `ApiService` fetches data from the backend based on the selected language and dispatches the data to the NgRx Store. The data is then available throughout the application via the store.

### Store Configuration
The store is configured in the `AppModule` with the `languageReducer` and `dataReducer`.

```typescript
// filepath: e:\GITWorkspace\ng-Internationalization-sample\src\app\app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ParentComponent } from "./components/parent/parent.component";
import { ChildComponent } from './components/child/child.component';
import { MultiTranslateLoader } from './services/multi-translate-loader';
import { LanguageService } from './services/language.service';
import { StoreModule } from '@ngrx/store';
import { languageReducer } from './store/language.reducer';
import { dataReducer } from './store/data.reducer';

// Function to load translation files
export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        ParentComponent,
        ChildComponent
    ],
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
        StoreModule.forRoot({ language: languageReducer, data: dataReducer }),
    ],
    bootstrap: [AppComponent],
    providers: [LanguageService], // ✅ Provide LanguageService here
})
export class AppModule { }
```

### Actions and Reducers
The actions and reducers for managing language and data state are defined in the `store` directory.

#### Language Actions
```typescript
// filepath: e:\GITWorkspace\ng-Internationalization-sample\src\app\store\language.actions.ts
import { createAction, props } from '@ngrx/store';

export const setLanguage = createAction(
  '[Language] Set Language',
  props<{ language: string }>()
);
```

#### Language Reducer
```typescript
// filepath: e:\GITWorkspace\ng-Internationalization-sample\src\app\store\language.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setLanguage } from './language.actions';

export const initialState: string = 'en';

const _languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => language)
);

export function languageReducer(state, action) {
  return _languageReducer(state, action);
}
```

#### Data Actions
```typescript
// filepath: e:\GITWorkspace\ng-Internationalization-sample\src\app\store\data.actions.ts
import { createAction, props } from '@ngrx/store';

export const setData = createAction(
  '[Data] Set Data',
  props<{ data: any[] }>()
);
```

#### Data Reducer
```typescript
// filepath: e:\GITWorkspace\ng-Internationalization-sample\src\app\store\data.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setData } from './data.actions';

export const initialState: any[] = [];

const _dataReducer = createReducer(
  initialState,
  on(setData, (state, { data }) => data)
);

export function dataReducer(state, action) {
  return _dataReducer(state, action);
}
