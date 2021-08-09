import { useState } from 'react';
import { Form, message } from 'antd';
import { auth, storage } from '../../firebase';
import { useTranslation } from 'react-i18next';
import {FormInstance} from 'antd/lib/form/';
import {UploadFile} from 'antd/lib/upload/interface';
import { useAlreadyAuthorized } from './useAlreadyAuthorized';

export function useSignUp(): [FormInstance, UploadFile[], React.Dispatch<React.SetStateAction<UploadFile[]>>, () => Promise<void>] {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation();

    const signUp = async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password);
            if (fileList.length !== 0){
                const anonymousUser = 'anonymous';
                const userId = !auth.currentUser ? anonymousUser : auth.currentUser.uid;
                const imgFile = storage.ref().child(`images/${userId}.png`);
                const metadata = {
                    contentType: 'image/jpeg',
                };

                const file = fileList[0];

                await imgFile.put(file as unknown as Blob | Uint8Array | ArrayBuffer, metadata);
            }
            
            const successSignUpMessage = t('auth.signUp.successSignUpMessage');

            message.success(successSignUpMessage);
        } catch(e) {
            message.error(e.message);
        }
    };

    useAlreadyAuthorized();

    return [form, fileList, setFileList, signUp];
}
