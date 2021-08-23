import React, { FormEvent } from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';
import { useContext } from 'react';
import { FormDataContext } from '../../views/components/auth/reducer';
import { FromDataContextReducerActions } from '../../views/components/auth/actions';

export function EmailField(props: FormFieldEntity): JSX.Element {
    const [store, dispatch] = useContext(FormDataContext);

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        dispatch({
            type: FromDataContextReducerActions.emailChange,
            payload: event.currentTarget.value,
        });
    };

    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
            initialValue={store.email}
        >
            <Input
                placeholder={props.placeholder}
                onChange={onChange}
            />
        </Form.Item>
    );
}
