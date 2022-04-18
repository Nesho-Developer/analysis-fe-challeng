import { Action } from '@ngrx/store';
import { FilterObject } from '../models/filterObject.model';

export enum FilterActionType {
    ADD_ITEM = '[FILTER] Add Filter',
}

export class AddItemAction implements Action {
    readonly type = FilterActionType.ADD_ITEM;

    // add an optional payload
    constructor(public payload: FilterObject) { }
}

export type FilterAction = AddItemAction;
