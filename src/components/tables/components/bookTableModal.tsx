import React, { SetStateAction, useContext } from 'react';
import { Modal, DatePicker, Space, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TableDataContextReducerActions } from './actions';
import { TableDataContext } from './reducer';
import moment, { Moment } from 'moment';
import { useTableModal } from '../../../core/hooks/tables/useTableModal';
import { scheduleTime } from '../../../core/constants/scheduleTime';
import { Dispatch } from 'react';
import { TableEntity } from './table';

interface BookTableModalProps{
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean> >,
    table: TableEntity,
}

export function BookTableModal (props: BookTableModalProps): JSX.Element {
    const [t, enableSevenDaysOnly, availableTimeMenu, bookTable, okButtonProps] = useTableModal(props.table);
    const [tableState, tableDispatch] = useContext(TableDataContext);
    const { visible, setVisible } = props; 

    const handleDatePickerChange = ( _: Moment | null, dateString: string): void => {
        tableDispatch({type: TableDataContextReducerActions.setDate, payload: dateString.replace('-0', '-')});
        if (dateString){
            tableDispatch({type: TableDataContextReducerActions.setTimeInterval, payload: -1});
            tableDispatch({type: TableDataContextReducerActions.enableDropdown, payload: undefined});
        } else {
            tableDispatch({type: TableDataContextReducerActions.setTimeInterval, payload: -1});
            tableDispatch({type: TableDataContextReducerActions.disableDropdown, payload: undefined});
        }
    };

    const handleOk = () => {
        bookTable();
        setVisible(false);
        tableDispatch({type: TableDataContextReducerActions.dropAllData, payload: undefined});
    };

    const handleCancel = () => {
        setVisible(false);
        tableDispatch({type: TableDataContextReducerActions.dropAllData, payload: undefined});
    };

    return (
        <Modal title={t('book.modalTitle')} visible={visible} onOk={handleOk} onCancel={handleCancel} okButtonProps={okButtonProps}>
            <Space>
                <DatePicker 
                    onChange={handleDatePickerChange}
                    value={tableState.date === '' ? null : moment(new Date(tableState.date))}
                    disabledDate={enableSevenDaysOnly}
                />
                <Dropdown disabled={tableState.isDropdownDisabled} overlay={availableTimeMenu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => {
                        e.preventDefault();
                    }}> 
                        {tableState.timeInterval !== -1 ? `${scheduleTime[tableState.timeInterval]} ` : 'Choose time interval '}<DownOutlined/>
                    </a>
                </Dropdown>
            </Space>
        </Modal>
    );
}
