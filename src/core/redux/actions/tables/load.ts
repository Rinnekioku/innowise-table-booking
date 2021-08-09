import { TableEntity } from '../../../../components/tables/components/table';
import { TablesActions } from '../../reducers/tables';
import { TablesReducerActions } from '../../reducers/tables/actions';

export function loadTablesAction(payload: TableEntity[]): TablesActions{
    return {
        type: TablesReducerActions.load,
        payload: payload,
    };
}