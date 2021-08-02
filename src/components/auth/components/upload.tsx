import React from 'react';
import {Form, Upload, Button, message} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadFile } from 'antd/lib/upload/interface';

interface UploadPropsEntity{
    name: string,
    fileList: UploadFile[],
    setFileList: any,
    buttonText: string,
}

export function UploadProfilePicture(props: UploadPropsEntity): JSX.Element {
    const fakeLoad = ({file}: UploadRequestOption) => {
        try {
            const successLoadMessage = 'Picture added successfully';
            props.setFileList([file]);
            message.success(successLoadMessage);
        } catch(e) {
            message.error(e.message);
        }
    };

    const onChange =({file} : {file: UploadFile}) => {
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
