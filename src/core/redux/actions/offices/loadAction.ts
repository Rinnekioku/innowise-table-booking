import { OfficeEntity } from '../../../../components/offices';
import { OfficesReducerActions } from '../../reducers/offices/actions';
import { OfficesActions } from '../../reducers/offices';

export function loadOfficesAction(payload: OfficeEntity[]): OfficesActions{
    return {
        type: OfficesReducerActions.loadOffices,
        payload: payload
    };
}
