import {useCallback, useState} from 'react';
import {Form, message} from 'antd';
import {auth, storage} from '../../firebase';

export function useSignUp(){
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

export function useSignIn(){
    const [form] = Form.useForm();

    const signIn = useCallback(async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            const successSingInMessage = 'Signed in successfully';

            await auth.signInWithEmailAndPassword(email, password);
            message.success(successSingInMessage);
        } catch(e) {
            message.error(e.message);
            console.error(e);
        }
    }, [form.getFieldValue(['email']), form.getFieldValue(['password'])]);

    return {form, signIn};
}
