import React, { FormEvent, useContext } from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './';
import { FormDataContext } from '../../views/components/auth/reducer';
import { FromDataContextReducerActions } from '../../views/components/auth/actions';

export function PasswordField(props: FormFieldEntity): JSX.Element {
    const [store, dispatch] = useContext(FormDataContext);

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        dispatch({
            type: FromDataContextReducerActions.passwordChange,
            payload: event.currentTarget.value,
        });
    };

    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
            hasFeedback={props.hasFeedback}
            initialValue={store.password}
        >
            <Input.Password
                placeholder={props.placeholder}
                onChange={onChange}
            />
        </Form.Item>
    );
}
