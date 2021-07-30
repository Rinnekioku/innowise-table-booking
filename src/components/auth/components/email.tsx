import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';

export function EmailField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
        >
            <Input
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
