import React from 'react';
import {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict} from './components';

export const SignUpConfig = (fileList: any[], setFileList: any): JSX.Element[] => [
    (
        <EmailField
            key={1}
            name="email"
            placeholder="Enter your email(@innowise-group.com)"
            rules={[
                () => ({validator(_: string, value: string) {
                    const emailRegExp = /.*@innowise-group.com$/;
                    const emptyEmailFieldErrorMessage = 'Email field is required';
                    const invalidEmailErrorMessage = 'Please use valid email';

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
            hasFeedback={true}
            rules={[
                () => ({validator(_: any, value: string) {
                    const emptyPasswordFieldErrorMessage = 'Password field is required';
                    const easyPasswordErrorMessage = 'Password must contain one number, lower and upper case latin letters, at least 8 characters';
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
            placeholder="Enter password"
        />
    ),
    (
        <PasswordConfirmField
            key={3}
            name="confirm"
            dependencies={['password']}
            hasFeedback={true}
            rules={[
                ({ getFieldValue }: {getFieldValue: any}) => ({
                    validator(_: any, value: string) {
                        const emptyConfirmPasswordFieldErrorMessage = 'Confirm password field is required';
                        const invalidConfirmPasswordErrorMessage = 'The two passwords that you entered do not match!';

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
