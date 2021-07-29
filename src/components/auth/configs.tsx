import React from 'react';
import {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict} from './components';

export const SignUpConfig = (fileList: any[], setFileList: any): JSX.Element[] => [
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
        <PasswordConfirmField
            key={3}
            name="confirm"
            dependencies={['password']}
            hasFeedback={true}
            placeholder="Confirm password"
        />
    ),
    (
        <UploadProfilePicture
            key={4}
            name="upload"
            fileList={fileList}
            setFileList={setFileList}
            buttonText="Upload"
        />
    ),
    (
        <SubmitButton
            key={5}
            name="sign_up"
            buttonText="Sign up"
        />
    ),
    (
        <AuthRedirict
            key={6}
            text='Already have account?&nbsp;'
            linkText='Sign in'
            path='/sign_in'
        />
    ),
];

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
