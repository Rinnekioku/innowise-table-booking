import React from 'react';
import {Form} from 'antd';
import {Link} from 'react-router-dom';

interface RedirictPropsEntity {
    text: string,
    linkText: string,
    path: string,
}

export function AuthRedirict(props: RedirictPropsEntity): JSX.Element {
    return (
        <Form.Item>
            {props.text}
            <Link to={props.path}>
                {props.linkText}
            </Link>
        </Form.Item>
    );
}
