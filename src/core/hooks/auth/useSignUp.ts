import { Dispatch, SetStateAction } from 'react';
import { Form, message } from 'antd';
import { auth } from '../../firebase';
import { useTranslation } from 'react-i18next';
import {FormInstance} from 'antd/lib/form/';
import {UploadFile} from 'antd/lib/upload/interface';
import { useAlreadyAuthorized } from './useAlreadyAuthorized';
import { useUploadFile } from './useUploadFile';

export function useSignUp(): [FormInstance, UploadFile[], Dispatch<SetStateAction<UploadFile[]> >, () => Promise<void>] {
    const [form] = Form.useForm();
    const [fileList, setFileList, uploadFile] = useUploadFile();
    const { t } = useTranslation();

    const signUp = async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password);
            await uploadFile();

            const successSignUpMessage = t('auth.signUp.successSignUpMessage');

            message.success(successSignUpMessage);
        } catch(e) {
            message.error(e.message);
        }
    };

    useAlreadyAuthorized();

    return [form, fileList, setFileList, signUp];
}
