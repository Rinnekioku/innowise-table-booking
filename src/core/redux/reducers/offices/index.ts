import { OfficeEntity } from '../../../../components/offices';
import { OfficesReducerActions } from './actions';

export interface OfficeStateEntity {
    isLoaded: boolean,
    error: boolean,
    offices: OfficeEntity[],
}

interface OfficesRemoveAddAction {
    type: OfficesReducerActions.remove | OfficesReducerActions.add,
    payload: OfficeEntity,
}

interface OfficesLoadAction {
    type: OfficesReducerActions.load,
    payload: OfficeEntity[],
}

export type OfficesActions = OfficesRemoveAddAction | OfficesLoadAction;

const initialState: OfficeStateEntity = {
    isLoaded: false,
    error: false,
    offices:[],
};

export function officesReducer(state: OfficeStateEntity = initialState, action: OfficesActions): OfficeStateEntity{
    switch (action.type) {
    case 'LOAD_OFFICES':
        if (action.payload?.length){
            return {
                ...state,
                isLoaded: true,
                error: false,
                offices: [...action.payload],
            };
        } else {
            return {
                ...state,
                isLoaded: true,
                error: true,
                offices: [],
            };
        }
    case 'ADD_OFFICE':
        return {
            ...state,
            offices: [...state.offices, action.payload],
        };
    case 'REMOVE_OFFICE':
        return {
            ...state,
            offices: [...state.offices.filter((item: OfficeEntity) => item.id !== action.payload.id)],
        };
    default:
        return state;
    }
}
