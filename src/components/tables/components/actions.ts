export enum TableDataContextReducerActions{
    setSchedule = 'SET_SCHEDULE',
    dropSchedule = 'DROP_SCHEDULE',
    setDate = 'SET_DATE',
    dropDate = 'DROP_DATE',
    setTimeInterval = 'SET_TIME_INTERVAL',
    dropTimeInterval = 'DROP_TIME_INTERVAL',
    enableDropdown = 'ENABLE_DROPDOWN',
    disableDropdown = 'DISABLE_DROPDOWN',
    dropAllData = 'DROP_ALL_DATA'
}

interface TableSetSchedule {
    type: TableDataContextReducerActions.setSchedule,
    payload: Map<string, string[]>,
}

interface TableDropSchedule {
    type: TableDataContextReducerActions.dropSchedule,
    payload: undefined,
}

interface TableSetDate {
    type: TableDataContextReducerActions.setDate,
    payload: string,
}

interface TableDropDate {
    type: TableDataContextReducerActions.dropDate,
    payload: undefined,
}

interface TableSetTimeInterval {
    type: TableDataContextReducerActions.setTimeInterval,
    payload: number,
}

interface TableDropTimeInterval {
    type: TableDataContextReducerActions.dropTimeInterval,
    payload: undefined,
}

interface TableSetDropdownCondition {
    type: TableDataContextReducerActions.enableDropdown |
        TableDataContextReducerActions.disableDropdown,
    payload: undefined,
}

interface TableDropAllData {
    type: TableDataContextReducerActions.dropAllData,
    payload: undefined,
}

export type TableActionType = 
    TableSetSchedule |
    TableDropSchedule |
    TableSetDate |
    TableDropDate |
    TableSetTimeInterval |
    TableDropTimeInterval |
    TableSetDropdownCondition |
    TableDropAllData;
