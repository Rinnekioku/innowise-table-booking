import React from 'react';
import {FormSC} from '../styled';
import {useSignIn} from '../../../core/hooks/auth';

interface SignInPropsEntity {
    config: JSX.Element[],
}

export function SignIn(props: SignInPropsEntity): JSX.Element {
    const [form, signIn] = useSignIn();
    
    return (
        <FormSC
            form={form}
            onSubmitCapture={signIn}
            name='sign_in'
        >
            {props.config}
        </FormSC>
    );
}
