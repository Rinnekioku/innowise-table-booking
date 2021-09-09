import { getTablePathInDB } from '../../core/constants/getTablePathInDB';

test('Check table path parser', () => {
    const URL = '/offices/misnk/rooms/room2misnk/tables';
    const tableId = 'table2minsk';
    const tablePathMatch = new RegExp('reservation/misnk/room2misnk/table2minsk');
    const tablePath = getTablePathInDB(URL, tableId);

    expect(tablePath).toMatch(tablePathMatch);
});
