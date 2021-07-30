import React from 'react';
import './style.less';
import {FormSC} from './styled';
import {SignUpConfig, SignInConfig} from './configs';
import {useSignIn, useSignUp} from '../../hooks/auth';

interface SignUpPropsEntity {
    config: (filiList: any[], setFileList: any) => JSX.Element[],
}

interface SignInPropsEntity {
    config: JSX.Element[],
}

export function SignUp(props: SignUpPropsEntity): JSX.Element {
    const {form, fileList, setFileList, signUp} = useSignUp();

    return (
        <FormSC
            form={form}
            onSubmitCapture={signUp}
            name='sign_up'
        >
            {props.config(fileList, setFileList)}
        </FormSC>
    );
}

export function SignIn(props: SignInPropsEntity): JSX.Element {
    const {form, signIn} = useSignIn();

    return (
        <FormSC
            form={form}
            onSubmitCapture={signIn}
            name='sign_up'
        >
            {props.config}
        </FormSC>
    );
}
