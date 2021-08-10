import { TableEntity } from '../../../../components/tables/components/table';

export enum TablesReducerActions {
    sagaLoad = 'LOAD_TABLES_SAGA',
    load = 'LOAD_TABLES',
    add = 'ADD_TABLE',
    remove = 'REMOVE_TABLES',
    error = 'HANDLE_TABLES_ERROR',
    loading = 'HANDLE_TABLES_LOAD',
    sagaDrop = 'DROP_TABLES_SAGA',
    drop = 'DROP_TABLES'

}

interface TablesRemoveAddAction {
    type: TablesReducerActions.remove | TablesReducerActions.add,
    payload: TableEntity,
}

interface TablesLoadAction {
    type: TablesReducerActions.load,
    payload: TableEntity[],
}

interface TablesLoadHandleAction {
    type: TablesReducerActions.loading,
    payload: boolean,
}

interface TablesErrorHandleAction {
    type: TablesReducerActions.error,
    payload: boolean,
}

interface TablesDropAction {
    type: TablesReducerActions.drop,
    payload: undefined,
}

export type TablesActionsType = 
    TablesRemoveAddAction |
    TablesLoadAction |
    TablesLoadHandleAction |
    TablesErrorHandleAction |
    TablesDropAction;
