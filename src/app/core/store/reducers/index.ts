import { ActionReducerMap } from '@ngrx/store';
import { filterReducer } from './filter.reducer';
import { AppState } from '../models/state.model'

export const rootReducer = {};

// Centralized App Reducers
export const reducers: ActionReducerMap<AppState, any> = {
    filter: filterReducer
};
