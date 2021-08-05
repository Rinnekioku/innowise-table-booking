import { useState } from 'react';
import { Form, message } from 'antd';
import { auth, storage } from '../../firebase';
import { useTranslation } from 'react-i18next';
import {FormInstance} from 'antd/lib/form/';
import {UploadFile} from 'antd/lib/upload/interface';

interface useSignUpEntity {
    form: FormInstance,
    fileList: UploadFile[],
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>,
    signUp: () => Promise<void>,
}

export function useSignUp(): useSignUpEntity{
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation();



    const signUp = async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password);

            const anonymousUser = 'anonymous';
            const userId = !auth.currentUser ? anonymousUser : auth.currentUser.uid;
            const imgFile = storage.ref().child(`images/${userId}.png`);
            const metadata = {
                contentType: 'image/jpeg',
            };

            const file = fileList[0];
            const successSignUpMessage = t('auth.signUp.successSignUpMessage');

            await imgFile.put(file as unknown as Blob | Uint8Array | ArrayBuffer, metadata);
            message.success(successSignUpMessage);
        } catch(e) {
            message.error(e.message);
        }
    };

    return {form, fileList, setFileList, signUp};
}
