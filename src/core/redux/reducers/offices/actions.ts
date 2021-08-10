import { OfficeEntity } from '../../../../components/offices';

export enum OfficesReducerActions {
    sagaLoad = 'LOAD_OFFICES_SAGA',
    loadOffices = 'LOAD_OFFICES',
    remove = 'REMOVE_OFFICE',
    add = 'ADD_OFFICE',
    error = 'HANDLE_OFFICES_ERROR',
    loading = 'HANDLE_OFFICES_LOAD',
    sagaDrop = 'DROP_OFFICES_SAGA',
    drop = 'DROP_OFFICES'
}

interface OfficesRemoveAddAction {
    type: OfficesReducerActions.remove | OfficesReducerActions.add,
    payload: OfficeEntity,
}

interface OfficesLoadAction {
    type: OfficesReducerActions.loadOffices,
    payload: OfficeEntity[],
}

interface OfficesErrorHandleAction {
    type: OfficesReducerActions.error,
    payload: boolean,
}

interface OfficesLoadHandleAction {
    type: OfficesReducerActions.loading,
    payload: boolean,
}

interface OfficesDropAction {
    type: OfficesReducerActions.drop,
    payload: undefined;
}

export type OfficesActionsType = 
    OfficesRemoveAddAction | 
    OfficesLoadAction | 
    OfficesErrorHandleAction | 
    OfficesLoadHandleAction |
    OfficesDropAction;