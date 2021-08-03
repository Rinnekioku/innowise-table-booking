import { useCallback, useState } from 'react';
import { Form, message } from 'antd';
import { auth, storage } from '../../firebase';
import { useTranslation } from 'react-i18next';

interface useSignUpEntity {
    form: any,
    fileList: any[],
    setFileList: any,
    signUp: any,
}

export function useSignUp(): useSignUpEntity{
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const { t } = useTranslation();

    const signUp = useCallback(async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password);

            const userId = auth.currentUser === null ? 'anonymous' : auth.currentUser.uid;
            const imgFile = storage.ref().child(`images/${userId}.png`);
            const metadata = {
                contentType: 'image/jpeg',
            };
            const file = fileList[0];
            const successSignUpMessage = t('auth.signUp.successSignUpMessage');

            await imgFile.put(file, metadata);
            message.success(successSignUpMessage);
        } catch(e) {
            message.error(e.message);
            console.error(e);
        }
    }, [fileList]);

    return {form, fileList, setFileList, signUp};
}
