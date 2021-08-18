import React, { SetStateAction } from 'react';
import { Modal } from 'antd';
import { Dispatch } from 'react';
import { CreateOfficeConfig } from '../../../core/configs/forms/createOffice';
import { AdminFormSC } from './styled';
import { useCreateOffice } from '../../../core/hooks/admin/useCreateOffice';

interface AdminModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean> >,
}

export function AdminModal(props: AdminModalProps): JSX.Element {
    const {visible, setVisible} = props;
    const [t, form, createOffice, onCancel] = useCreateOffice(setVisible);

    return (
        <Modal 
            title={t('admin.modalTitle')}
            visible={visible}
            onCancel={onCancel}
            footer={[]}
        >
            <AdminFormSC 
                form={form}
                onSubmitCapture={createOffice}
            >
                {CreateOfficeConfig()} 
            </AdminFormSC>
        </Modal>
    );
}
