import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './';

export function PasswordField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            rules={[
                () => ({validator(_ ,value) {
                    const emptyPasswordFieldErrorMessage = 'Password field is required';
                    const easyPasswordErrorMessage = 'Password must contain one number, lower and upper case latin letters, at least 8 characters';
                    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

                    if (value.length > 8 && value.match(passwordRegExp)){
                        return Promise.resolve(easyPasswordErrorMessage);
                    } else if(value === '') {
                        return Promise.reject(new Error(emptyPasswordFieldErrorMessage));
                    } else {
                        return Promise.reject(new Error());
                    }
                }}),
            ]}
            hasFeedback={props.hasFeedback}
        >
            <Input.Password
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
