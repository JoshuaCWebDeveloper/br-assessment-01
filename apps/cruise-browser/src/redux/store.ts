import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import gmrtApi from './modules/api/gmrt.api';
import cruiseList from './modules/cruise-list/cruise-list.slice';

const rootReducer = combineReducers({
    [cruiseList.name]: cruiseList.reducer,
    [gmrtApi.reducerPath]: gmrtApi.reducer,
});

export const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(gmrtApi.middleware),
    });

    setupListeners(store.dispatch);

    return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
