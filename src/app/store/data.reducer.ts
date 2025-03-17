import { Action, createReducer, on } from '@ngrx/store';
import { setData } from './data.actions';

export const initialState: any[] = [];

const _dataReducer = createReducer(
  initialState,
  on(setData, (state, { data }) => data)
);

export function dataReducer(state: any[] | undefined, action: Action) {
  return _dataReducer(state, action);
}
