import React, {useCallback} from 'react';
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
    const fakeLoad = useCallback(({file, onError, onSuccess}) => {
        try {
            const successLoadMessage = 'Picture added successfully';
            props.setFileList([file]);
            onSuccess(null, file);
            message.success(successLoadMessage);
        } catch(e) {
            onError(e);
            message.error(e.message);
        }
    },[props.fileList]);

    const onChange = useCallback(({file} : {file: any}) => {
        if (file.status === 'removed'){
            props.setFileList([]);
        }
    }, [props.fileList]);
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
