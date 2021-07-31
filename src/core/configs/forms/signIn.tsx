import React from 'react';
import {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict} from '../../../components/auth/components';

export const SignInConfig: JSX.Element[] = [
    (
        <EmailField
            key={1}
            name="email"
            placeholder="Enter your email(@innowise-group.com)"
            hasFeedback={false}
        />
    ),
    (
        <PasswordField
            key={2}
            name="password"
            hasFeedback={true}
            placeholder="Enter password"
        />
    ),
    (
        <SubmitButton
            key={3}
            name="sign_in"
            buttonText="Sign in"
        />
    ),
    (
        <AuthRedirict
            key={4}
            text='Don not have account yet?&nbsp;'
            linkText='Sign up'
            path='/sign_up'
        />
    ),
];
