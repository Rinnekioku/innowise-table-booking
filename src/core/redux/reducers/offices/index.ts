import { OfficeEntity } from '../../../../components/offices';
import { OfficesReducerActions } from './actions';
import { OfficesActionsType } from './actions';

export interface OfficeStateEntity {
    isLoading: boolean,
    error: boolean,
    offices: OfficeEntity[],
}

const initialState: OfficeStateEntity = {
    isLoading: true,
    error: false,
    offices:[],
};

export function officesReducer(state: OfficeStateEntity = initialState, action: OfficesActionsType): OfficeStateEntity{
    switch (action.type) {
    case OfficesReducerActions.loadOffices:
        if (action.payload?.length){
            return {
                ...state,
                offices: [...action.payload],
            };
        } else {
            return {
                ...state,
                offices: [],
            };
        }
    case OfficesReducerActions.drop:
        return {
            ...state,
            offices: [],
        };
    case OfficesReducerActions.loading:
        return {
            ...state,
            isLoading: action.payload,
        };
    case OfficesReducerActions.error:
        return {
            ...state,
            error: action.payload,
        };
    case OfficesReducerActions.add:
        return {
            ...state,
            offices: [...state.offices, action.payload],
        };
    case OfficesReducerActions.remove:
        return {
            ...state,
            offices: [...state.offices.filter((item: OfficeEntity) => item.id !== action.payload.id)],
        };
    default:
        return state;
    }
}
