import { db } from '../../../firebase';

export function* loadOffices(dispatch: any): any{
    const officesRef = yield db.ref('offices/');
    yield officesRef.on('value', (snapshot: any) => {
        const data = snapshot.val();
        console.log('Offices from sagas', data);
        dispatch({type: 'LOAD_OFFICES',payload: Object.values(data)});
    });
}