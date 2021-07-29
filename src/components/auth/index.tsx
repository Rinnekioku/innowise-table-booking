import React from 'react';
import './style.less';
import {FormSC} from './styled';
import {SignUpConfig, SignInConfig} from './configs';
import {useSignIn, useSignUp} from '../../hooks/auth';

export function SignUp(): JSX.Element {
    const {form, fileList, setFileList, signUp} = useSignUp();

    return (
        <FormSC
            form={form}
            onSubmitCapture={signUp}
            name='sign_up'
        >
            {SignUpConfig(fileList, setFileList).map(item => item)}
        </FormSC>
    );
}

export function SignIn(): JSX.Element {
    const {form, signIn} = useSignIn();

    return (
        <FormSC
            form={form}
            onSubmitCapture={signIn}
            name='sign_up'
        >
            {SignInConfig.map(item => item)}
        </FormSC>
    );
}
