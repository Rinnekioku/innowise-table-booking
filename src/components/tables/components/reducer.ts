import { createContext, Dispatch } from 'react';
import { TableActionType, TableDataContextReducerActions } from './actions';

export interface TableDataContextEntity {
    tableId: string,
    schedule: Map<string, string[]>,
    date: string,
    timeInterval: number,
    isDropdownDisabled: boolean,
}

export const initialTableDataContextState: TableDataContextEntity = {
    tableId: '',
    schedule: new Map(),
    date: '',
    timeInterval: -1,
    isDropdownDisabled: true,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const TableDataContext = createContext<[TableDataContextEntity, Dispatch<TableActionType>]>([initialTableDataContextState, () => {}]);

export function tableDataContextReducer(state: TableDataContextEntity, action: TableActionType): TableDataContextEntity {
    switch (action.type) {
    case TableDataContextReducerActions.setSchedule:
        return {
            ...state,
            schedule: action.payload,
        };
    case TableDataContextReducerActions.dropSchedule:
        return {
            ...state,
            schedule: initialTableDataContextState.schedule,
        };
    case TableDataContextReducerActions.setDate:
        return {
            ...state,
            date: action.payload
        };
    case TableDataContextReducerActions.dropDate:
        return {
            ...state,
            date: initialTableDataContextState.date,
        };
    case TableDataContextReducerActions.setTimeInterval:
        return {
            ...state,
            timeInterval: action.payload
        };
    case TableDataContextReducerActions.dropTimeInterval:
        return {
            ...state,
            timeInterval: initialTableDataContextState.timeInterval,
        };
    case TableDataContextReducerActions.enableDropdown:
        return {
            ...state,
            isDropdownDisabled: false,
        };
    case TableDataContextReducerActions.disableDropdown:
        return {
            ...state,
            isDropdownDisabled: true,
        };
    case TableDataContextReducerActions.dropAllData:
        return {...initialTableDataContextState};
    }
}
