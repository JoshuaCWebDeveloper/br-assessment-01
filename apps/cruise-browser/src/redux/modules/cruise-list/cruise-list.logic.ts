import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Cruise } from '../api/gmrt.api';
import { selectFilter, selectSort, Sort, SortAs } from './cruise-list.slice';

export class CruiseListLogic {
    // define a collection of handlers to sort by various data types
    private sortHandlers: Record<
        SortAs,
        (sort: Sort) => (a: Cruise, b: Cruise) => number
    > = {
        NUMBER: sort => (a, b) =>
            (parseInt(a[sort.field] as string) -
                parseInt(b[sort.field] as string)) *
            sort.order,
    };

    public filterCruises = createSelector(
        selectFilter,
        selectSort,
        (_: RootState, cruiseData: Cruise[]) => cruiseData,
        (filter, sort, cruiseData) => {
            // copy
            cruiseData = cruiseData.slice();
            // filter
            if (filter) {
                // turn our string filter into a regex
                const filterRegex = new RegExp(filter.replace(' ', '\\s'));
                //and use it to filter our cruises
                cruiseData = cruiseData.filter(cruise => {
                    // does the name match our filter?
                    return this.getCruiseName(cruise).match(filterRegex);
                });
            }
            // sort
            if (sort) {
                // sort using the handler for the given data type
                cruiseData.sort(this.sortHandlers[sort.as](sort));
            }
            // our data should be sorted and filtered
            return cruiseData;
        }
    );

    getCruiseName(cruise: Cruise) {
        return `${cruise.entry_id} - ${cruise.device_make} ${cruise.device_model} ${cruise.platform_id}`;
    }
}
