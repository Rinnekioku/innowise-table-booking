import { TableEntity } from '../../../../components/tables/components/table';
import { TablesReducerActions } from './actions';

export interface TablesStateEntity {
    isLoaded: boolean,
    error: boolean,
    tables: TableEntity[],
}

interface TablesRemoveAddAction {
    type: TablesReducerActions.remove | TablesReducerActions.add,
    payload: TableEntity,
}

interface TablesLoadAction {
    type: TablesReducerActions.load,
    payload: TableEntity[],
}

export type TablesActions = TablesRemoveAddAction | TablesLoadAction;

const initialState: TablesStateEntity = {
    isLoaded: false,
    error: false,
    tables: [],
};

export function tablesReducer(state: TablesStateEntity = initialState, action: TablesActions): TablesStateEntity {
    switch (action.type){
    case TablesReducerActions.load:
        if (action.payload?.length){
            return {
                ...state,
                isLoaded: true,
                error: false,
                tables: [...action.payload],
            };
        } else {
            return {
                ...state,
                isLoaded: true,
                error: true,
                tables: [],
            };
        }
    case TablesReducerActions.add:
        return {
            ...state,
            tables: [...state.tables, action.payload],
        };
    case TablesReducerActions.remove:
        return {
            ...state,
            tables: [...state.tables.filter((item: TableEntity) => item.id !== action.payload.id)],
        };
    default:
        return state;
    }
}