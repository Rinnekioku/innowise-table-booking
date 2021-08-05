import { Form, FormInstance, message } from 'antd';
import { auth } from '../../firebase';
import { useTranslation } from 'react-i18next'; 

interface useSignInEntity {
    form: FormInstance,
    signIn: () => void,
}

export function useSignIn(): useSignInEntity{
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const signIn = async () => {
        const email = form.getFieldValue(['email']);
        const password = form.getFieldValue(['password']);
        try {
            const successSignInMessage = t('auth.signIn.successSignInMessage');

            await auth.signInWithEmailAndPassword(email, password);
            message.success(successSignInMessage);
        } catch(e) {
            message.error(e.message);
        }
    };

    return {form, signIn};
}
