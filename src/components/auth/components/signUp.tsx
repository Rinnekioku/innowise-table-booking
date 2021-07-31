import React from 'react';
import {FormSC} from '../styled';
import { useSignUp } from '../../../core/hooks/auth';

interface SignUpPropsEntity {
    config: (filiList: any[], setFileList: any) => JSX.Element[],
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