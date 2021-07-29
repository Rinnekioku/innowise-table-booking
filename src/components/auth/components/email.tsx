import React from 'react';
import {Form, Input} from 'antd';
import {FormFieldEntity} from './index';

export function EmailField(props: FormFieldEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
            rules={[
                () => ({validator(_ ,value) {
                    const emailRegExp = /.*@innowise-group.com$/;
                    const emptyEmailFieldErrorMessage = 'Email field is required';
                    const invalidEmailErrorMessage = 'Please use valid email';

                    if (value.match(emailRegExp) !== null){
                        console.log(value);
                        return Promise.resolve();
                    } else if (value === ''){
                        return Promise.reject(new Error(emptyEmailFieldErrorMessage));
                    } else {
                        return Promise.reject(new Error(invalidEmailErrorMessage));
                    }
                },
                }),
            ]}
        >
            <Input
                placeholder={props.placeholder}
            />
        </Form.Item>
    );
}
