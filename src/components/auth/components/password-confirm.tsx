import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';

export function PasswordConfirmField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            dependencies={props.dependencies}
            rules={props.rules}
            hasFeedback={props.hasFeedback}
        >
            <Input.Password
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
