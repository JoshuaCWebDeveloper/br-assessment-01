import { IconButton, SortAscIcon, SortDescIcon, Table } from 'evergreen-ui';
import memoize from 'fast-memoize';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext, useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetCruisesQuery } from '../redux/modules/api/gmrt.api';
import {
    filter,
    selectSort,
    sort,
    SortAs,
} from '../redux/modules/cruise-list/cruise-list.slice';

export const CruiseList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { logic } = useAppContext();
    const { data } = useGetCruisesQuery();
    const sortOrder = useAppSelector(selectSort)?.order ?? 1;
    const cruises = useAppSelector(state =>
        logic.cruiseList.filterCruises(state, data ? Object.values(data) : [])
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createSortHandler = useCallback(
        memoize((field: string, as: SortAs) => () => {
            dispatch(sort({ field, as, order: sortOrder > 0 ? -1 : 1 }));
        }),
        [sort, sortOrder]
    );

    const handleFilterChange = useCallback(
        (value: string) => {
            dispatch(filter(value));
        },
        [dispatch]
    );

    return (
        <div className="cruise-list">
            <Table className="table">
                <Table.Head>
                    <Table.SearchHeaderCell
                        placeholder="Filter by Name or Entry Id..."
                        onChange={handleFilterChange}
                    />
                    <Table.TextHeaderCell>
                        Year{' '}
                        <IconButton
                            icon={sortOrder > 0 ? SortAscIcon : SortDescIcon}
                            onClick={createSortHandler('year', SortAs.NUMBER)}
                        />
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body className="table-body">
                    {cruises.map(cruise => {
                        const name = logic.cruiseList.getCruiseName(cruise);

                        return (
                            <Table.Row
                                key={cruise.gmrt_entry_id}
                                isSelectable
                                onSelect={() =>
                                    navigate('/cruises/' + cruise.gmrt_entry_id)
                                }
                            >
                                <Table.TextCell>{name}</Table.TextCell>
                                <Table.TextCell>{cruise.year}</Table.TextCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};
