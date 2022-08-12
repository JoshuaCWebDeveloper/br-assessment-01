import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Slice

export enum SortAs {
    NUMBER = 'NUMBER',
}

export type Sort = {
    field: string;
    order: -1 | 1;
    as: SortAs;
};

export interface CruiseListState {
    filter?: string;
    sort: Sort;
}

const initialState: CruiseListState = {
    sort: {
        field: 'year',
        order: 1,
        as: SortAs.NUMBER,
    },
};

export const cruiseListSlice = createSlice({
    name: 'cruiseList',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        filter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        sort: (state, action: PayloadAction<Sort>) => {
            state.sort = action.payload;
        },
    },
});

export const { filter, sort } = cruiseListSlice.actions;

// Selectors

export const selectCruiseList = (state: RootState) => state.cruiseList;
export const selectSort = createSelector(selectCruiseList, list => list.sort);
export const selectFilter = createSelector(
    selectCruiseList,
    list => list.filter
);

export default cruiseListSlice;
