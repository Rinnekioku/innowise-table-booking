import React from 'react';
import {Form, Upload, Button, message} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';

interface UploadPropsEntity{
    name: string,
    fileList: any[],
    setFileList: any,
    buttonText: string,
}

export function UploadProfilePicture(props: UploadPropsEntity): JSX.Element {
    const fakeLoad = ({file, onError, onSuccess}: any) => {
        try {
            const successLoadMessage = 'Picture added successfully';
            props.setFileList([file]);
            onSuccess(null, file);
            message.success(successLoadMessage);
        } catch(e) {
            onError(e);
            message.error(e.message);
        }
    };

    const onChange =({file} : {file: any}) => {
        if (file.status === 'removed'){
            props.setFileList([]);
        }
    };

    return (
        <Form.Item
            name={props.name}
        >
            <ImgCrop rotate>
                <Upload
                    customRequest={fakeLoad}
                    fileList={props.fileList}
                    onChange={onChange}
                >
                    <Button
                        icon={<UploadOutlined/>}
                    >
                        {props.buttonText}
                    </Button>
                </Upload>
            </ImgCrop>
        </Form.Item>
    );
}
