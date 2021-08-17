import React from 'react';
import {FormSC} from '../styled';
import { useSignUp } from '../../../core/hooks/auth';
import { UploadFile } from 'antd/lib/upload/interface';

interface SignUpPropsEntity {
    config: (fileList: UploadFile[], setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>) => JSX.Element[],
}

export function SignUp(props: SignUpPropsEntity): JSX.Element {
    const [form, fileList, setFileList, signUp] = useSignUp();

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