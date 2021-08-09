import React from 'react';
import {Form, Button} from 'antd';
import { useHistory } from 'react-router-dom';

interface SubmitButtonEntity {
    name: string,
    buttonText: string,
}

export function SubmitButton(props: SubmitButtonEntity): JSX.Element {
    const history = useHistory();
    return (
        <Form.Item
            name={props.name}
        >
            <Button htmlType="submit" onClick={() => {history.push('/offices');}}>
                {props.buttonText}
            </Button>
        </Form.Item>
    );
}
