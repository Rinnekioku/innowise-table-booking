import { TableEntity } from '../../../../components/tables/components/table';
import { TablesReducerActions } from './actions';
import { TablesActionsType } from './actions';

export interface TablesStateEntity {
    isLoading: boolean,
    error: boolean,
    tables: TableEntity[],
}

const initialState: TablesStateEntity = {
    isLoading: true,
    error: false,
    tables: [],
};

export function tablesReducer(state: TablesStateEntity = initialState, action: TablesActionsType): TablesStateEntity {
    switch (action.type){
    case TablesReducerActions.load:
        if (action.payload?.length){
            return {
                ...state,
                tables: [...action.payload],
            };
        } else {
            return {
                ...state,
                tables: [],
            };
        }
    case TablesReducerActions.drop:
        return {
            ...state,
            tables: [],
        };
    case TablesReducerActions.error:
        return {
            ...state,
            error: action.payload,
        };
    case TablesReducerActions.loading:
        return {
            ...state,
            isLoading: action.payload
        };
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