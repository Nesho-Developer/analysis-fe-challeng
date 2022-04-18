// import the interface
import { FilterObject } from '../models/filterObject.model';
import { FilterAction, FilterActionType } from '../actions/filter.action';

// prodcuts interface
export interface FilterState {
    filter: FilterObject;
}

// create a dummy initial state
const initialState: FilterState = {
    filter: getDataFromLocal()

};
// retrieve filter from the localstorage
function getDataFromLocal(): FilterObject {
  return JSON.parse(localStorage.getItem('state')??'{}');
}
// create a reducer to tie an action and store to manipulate and manage the state
export function filterReducer(
    state = initialState,
    action: FilterAction
): FilterState {
    switch (action.type) {
        case FilterActionType.ADD_ITEM:
          // save payload to the localstorage
          localStorage.setItem('state', JSON.stringify(action.payload))
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}
