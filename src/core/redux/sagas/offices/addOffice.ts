import { db } from '../../../firebase';

export function* removeOffice(officeId: string, dispatch: any): any{
    yield db.ref(`offices/${officeId}`).remove();
    yield dispatch({type: 'REMOVE_OFFICE', payload: {id: officeId}});
}