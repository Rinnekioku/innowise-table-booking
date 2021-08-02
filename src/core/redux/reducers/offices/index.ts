const initialState: any[] = [];

export function officesReducer(state: any = initialState, action: any){
    switch (action.type) {
    case 'LOAD_OFFICES':
        return action.payload;
    case 'ADD_OFFICE':
        return [
            ...state,
            action.payload,
        ];
    case 'REMOVE_OFFICE':
        return [
            ...state.filter((item: any) => item.id !== action.payload.id)
        ];
    default:
        return state;
    }
}
