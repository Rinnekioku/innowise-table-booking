import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';
import { useContext } from 'react';
import { FormDataContext } from '../../views/components/auth/reducer';
import { FromDataContextReducerActions } from '../../views/components/auth/actions';


export function PasswordConfirmField(props: FormFieldEntity): JSX.Element {
    const [store, dispatch] = useContext(FormDataContext);
    return (
        <Form.Item
            name={props.name}
            dependencies={props.dependencies}
            rules={props.rules}
            hasFeedback={props.hasFeedback}
            initialValue={store.passwordConfirm}
        >
            <Input.Password
                placeholder={props.placeholder}
                onChange={(e) => {
                    dispatch({
                        type: FromDataContextReducerActions.passwordConfirmChange,
                        payload: e.target.value,
                    });
                }} 
            />
        </Form.Item>
    );
}
