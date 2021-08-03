const initialState: any = {
    isLoaded: false,
    error: false,
    offices: [],
};

export function officesReducer(state: any = initialState, action: any){
    switch (action.type) {
    case 'LOAD_OFFICES':
        if (action.payload.length === 0){
            return {
                ...state,
                isLoaded: true,
                error: true,
                offices: [...state.offices, ...action.payload],
            };
        } else {
            return {
                ...state,
                isLoaded: true,
                error: false,
                offices: [...state.offices, ...action.payload],
            };
        }
    case 'ADD_OFFICE':
        return {
            ...state,
            offices: [...state.offices, ...action.payload],
        };
    case 'REMOVE_OFFICE':
        return {
            ...state,
            offices: [...state.filter((item: any) => item.id !== action.payload.id)],
        };
    default:
        return state;
    }
}
