import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';

export function PasswordConfirmField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            dependencies={props.dependencies}
            rules={[
                ({ getFieldValue }) => ({
                    validator(_, value) {
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
            hasFeedback={props.hasFeedback}
        >
            <Input.Password
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
