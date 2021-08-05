import React from 'react';
import i18n from 'i18next';
import {EmailField, PasswordField, SubmitButton, AuthRedirict} from '../../../components/auth/components';
import { AuthLinks } from '../../routes';

export const SignInConfig: () => JSX.Element[] = () => [
    (
        <EmailField
            key={1}
            name="email"
            placeholder={i18n.t('auth.email.placeholder')}
            hasFeedback={false}
        />
    ),
    (
        <PasswordField
            key={2}
            name="password"
            hasFeedback={true}
            placeholder={i18n.t('auth.password.placeholder')}
        />
    ),
    (
        <SubmitButton
            key={3}
            name="sign_in"
            buttonText={i18n.t('auth.signIn.buttonText')}
        />
    ),
    (
        <AuthRedirict
            key={4}
            text={i18n.t('auth.signIn.redirictText')}
            linkText={i18n.t('auth.signIn.linkText')}
            path={AuthLinks.signUp}
        />
    ),
];
