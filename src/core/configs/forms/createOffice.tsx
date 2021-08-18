import React from 'react';
import { Input, InputNumber, Button } from 'antd';
import i18n from 'i18next';
import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { AdminFormItemSC } from '../../../components/profile/components/styled';

export const CreateOfficeConfig = (): JSX.Element[] => [
    (<AdminFormItemSC
        key={1}
        label={i18n.t('admin.office')}
        rules={[
            ({validator(_: RuleObject, value: StoreValue) {
                const emptyOfficeNameErrorMessage = i18n.t('admin.error.emptyOffice');

                if (value === ''){
                    return Promise.reject(new Error(emptyOfficeNameErrorMessage));
                } else {
                    return Promise.resolve();
                }
            },
            }),
        ]}
        name={'office'}
    >
        <Input
            placeholder={i18n.t('admin.office')}
        />
    </AdminFormItemSC>),

    (<AdminFormItemSC
        key={2}
        label={i18n.t('admin.roomsQuantity')}
        rules={[
            ({validator(_: RuleObject, value: StoreValue) {
                const redundantRoomsErrorMessage = i18n.t('admin.error.maxNumberOfRooms');
                const negativeRoomsErrorMessage = i18n.t('admin.error.negativeNumberOfRooms');

                if (value > 200) {
                    return Promise.reject(new Error(redundantRoomsErrorMessage));
                } else if (value <= 0) {
                    return Promise.reject(new Error(negativeRoomsErrorMessage));
                } else {
                    return Promise.resolve();
                }
            },
            }),
        ]}
        name={'rooms_n'}
    >
        <InputNumber
            placeholder={i18n.t('admin.roomsQuantity')}
        />
    </AdminFormItemSC>),
    (<AdminFormItemSC
        key={3}
        label={i18n.t('admin.tablesQuantity')}
        rules={[
            ({validator(_: RuleObject, value: StoreValue) {
                const redundantTablesErrorMessage = i18n.t('admin.error.maxNumberOfTables');
                const negativeTablesErrorMessage = i18n.t('admin.error.negativeNumberOfTables');

                if (value > 50) {
                    return Promise.reject(new Error(redundantTablesErrorMessage));
                } else if (value <= 0) {
                    return Promise.reject(new Error(negativeTablesErrorMessage));
                } else {
                    return Promise.resolve();
                }
            },
            }),
        ]}
        name={'tables_n'}
    >
        <InputNumber
            placeholder={i18n.t('admin.tablesQuantity')}
        />
    </AdminFormItemSC>),
    (<AdminFormItemSC
        key={4}
        name={'create_office'}
    >
        <Button htmlType='submit'>
            {i18n.t('admin.createOffice')}
        </Button>
    </AdminFormItemSC>),
];