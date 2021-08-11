import React, { useContext } from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './';
import { FormDataContext } from '../../views/components/auth/reducer';
import { FromDataContextReducerActions } from '../../views/components/auth/actions';

export function PasswordField(props: FormFieldEntity): JSX.Element {
    const [store, dispatch] = useContext(FormDataContext);
    return (
        <Form.Item
            name={props.name}
            rules={props.rules}
            hasFeedback={props.hasFeedback}
            initialValue={store.password}
        >
            <Input.Password
                placeholder={props.placeholder}
                onChange={(e) => {
                    dispatch({
                        type: FromDataContextReducerActions.passwordChange,
                        payload: e.target.value,
                    });
                }}
            />
        </Form.Item>
    );
}
