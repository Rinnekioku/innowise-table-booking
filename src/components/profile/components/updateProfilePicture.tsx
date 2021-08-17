import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadOutlined } from '@ant-design/icons';
import { getStorageRefWithMetadata } from '../../../core/constants/getStorageRefWithMetadata';
import { useTranslation } from 'react-i18next';

interface UpdateProfilePictureProps {
    updateAvatarURL: () => void,
}

export function UpdateProfilePicture(props: UpdateProfilePictureProps): JSX.Element {
    const { updateAvatarURL } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation();


    const loadFile = async ({file}: UploadRequestOption) => {
        try {
            const successLoadMessage = t('upload.success');
            const [imgFile, metadata] = getStorageRefWithMetadata();

            await imgFile.put(file as unknown as Blob | Uint8Array | ArrayBuffer, metadata);
            setFileList([]);

            message.success(successLoadMessage);
            updateAvatarURL();
        } catch(e) {
            setFileList([]);
            message.error(e.message);
        }
    };

    return (
        <ImgCrop
            rotate
        >
            <Upload
                customRequest={loadFile}
                fileList={fileList}
            >
                <Button
                    icon={<UploadOutlined/>}
                >
                    {t('upload.change')}
                </Button>
            </Upload>
        </ImgCrop>
    );
}