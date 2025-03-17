import { Action, createReducer, on } from '@ngrx/store';
import { setLanguage } from './language.actions';

export const initialState: string = 'en';

const _languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => language)
);

export function languageReducer(state: string | undefined, action: Action) {
  return _languageReducer(state, action);
}
