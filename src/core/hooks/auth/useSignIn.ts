import {useCallback, useState} from 'react';
import {Form, message} from 'antd';
import {auth, storage} from '../../firebase';
import { UploadFile } from 'antd/lib/upload/interface';

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
