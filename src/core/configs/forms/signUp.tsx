import React from 'react';
import {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict} from '../../../components/auth/components';
import { StoreValue, RuleObject } from 'rc-field-form/lib/interface';
import i18n from 'i18next';

export const SignUpConfig = (fileList: any[], setFileList: any): JSX.Element[] => [
    (

        <EmailField
            key={1}
            name="email"
            placeholder={i18n.t('auth.email.placeholder')}
            rules={[
                ({validator(_: RuleObject, value: StoreValue) {
                    const emailRegExp = /.*@innowise-group.com$/;
                    const emptyEmailFieldErrorMessage = i18n.t('auth.email.emptyEmailFieldErrorMessage');
                    const invalidEmailErrorMessage = i18n.t('auth.email.invalidEmailErrorMessage');

                    if (value.match(emailRegExp) !== null){
                        console.log(value);
                        return Promise.resolve();
                    } else if (value === ''){
                        return Promise.reject(new Error(emptyEmailFieldErrorMessage));
                    } else {
                        return Promise.reject(new Error(invalidEmailErrorMessage));
                    }
                },
                }),
            ]}
            hasFeedback={false}
        />
    ),
    (
        <PasswordField
            key={2}
            name="password"
            placeholder={i18n.t('auth.password.placeholder')}
            hasFeedback={true}
            rules={[
                () => ({validator(_: any, value: string) {
                    const emptyPasswordFieldErrorMessage = i18n.t('auth.password.emptyPasswordFieldErrorMessage');
                    const easyPasswordErrorMessage = i18n.t('auth.password.easyPasswordErrorMessage');
                    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

                    if (value.length > 8 && value.match(passwordRegExp)){
                        return Promise.resolve();
                    } else if(value === '') {
                        return Promise.reject(new Error(emptyPasswordFieldErrorMessage));
                    } else {
                        return Promise.reject(new Error(easyPasswordErrorMessage));
                    }
                }}),
            ]}
        />
    ),
    (
        <PasswordConfirmField
            key={3}
            name="confirm"
            placeholder={i18n.t('auth.passwordConfirm.placeholder')}
            dependencies={['password']}
            hasFeedback={true}
            rules={[
                ({ getFieldValue }: {getFieldValue: any}) => ({
                    validator(_: any, value: string) {
                        const emptyConfirmPasswordFieldErrorMessage = i18n.t('auth.passwordConfirm.emptyConfirmPasswordFieldErrorMessage');
                        const invalidConfirmPasswordErrorMessage = i18n.t('auth.passwordConfirm.invalidConfirmPasswordErrorMessage');

                        if (getFieldValue(['password']) === value) {
                            return Promise.resolve();
                        } else if (value === '') {
                            return Promise.reject(new Error(emptyConfirmPasswordFieldErrorMessage));
                        } else  {
                            return Promise.reject(new Error(invalidConfirmPasswordErrorMessage));
                        }
                    },
                }),
            ]}
        />
    ),
    (
        <UploadProfilePicture
            key={4}
            name="upload"
            fileList={fileList}
            setFileList={setFileList}
            buttonText={i18n.t('auth.upload.buttonText')}
        />
    ),
    (
        <SubmitButton
            key={5}
            name="sign_up"
            buttonText={i18n.t('auth.signUp.buttonText')}
        />
    ),
    (
        <AuthRedirict
            key={6}
            text={i18n.t('auth.signUp.redirictText')}
            linkText={i18n.t('auth.signUp.linkText')}
            path='/sign_in'
        />
    ),
];