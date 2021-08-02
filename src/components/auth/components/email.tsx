import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';
import { store } from '../../../core/redux';
import { useDispatch } from 'react-redux';

export function EmailField(props: FormFieldEntity): JSX.Element {
    const dispatch = useDispatch();
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
