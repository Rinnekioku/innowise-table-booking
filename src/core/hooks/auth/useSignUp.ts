import {useCallback, useState} from 'react';
import {Form, message} from 'antd';
import {auth, storage} from '../../firebase';

interface useSignUpEntity {
    form: any,
    fileList: any[],
    setFileList: any,
    signUp: any,
}

export function useSignUp(): useSignUpEntity{
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

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
            const successSignUpMessage = 'Signed up successfully';

            await imgFile.put(file, metadata);
            message.success(successSignUpMessage);
        } catch(e) {
            message.error(e.message);
            console.error(e);
        }
    }, [fileList]);

    return {form, fileList, setFileList, signUp};
}
