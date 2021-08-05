import React from 'react';
import {Form, Button} from 'antd';

interface SubmitButtonEntity {
    name: string,
    buttonText: string,
}

export function SubmitButton(props: SubmitButtonEntity): JSX.Element {
    return (
        <Form.Item
            name={props.name}
        >
            <Button htmlType="submit">
                {props.buttonText}
            </Button>
        </Form.Item>
    );
}
