import { Dispatch, SetStateAction, useState } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { message } from 'antd';
import { getStorageRefWithMetadata } from '../../constants/getStorageRefWithMetadata';
import { useTranslation } from 'react-i18next';

export function useUploadFile(): [UploadFile[], Dispatch<SetStateAction<UploadFile[]>>, () => Promise<void>] { 
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation();

    const uploadFile = async () => {
        try {
            if (fileList.length !== 0){
                const successLoadMessage = t('upload.success');
                const [imgFile, metadata] = getStorageRefWithMetadata();
                const file = fileList[0];

                await imgFile.put(file as unknown as Blob | Uint8Array | ArrayBuffer, metadata);
                message.success(successLoadMessage);
            }
        } catch(e) {
            message.error(e.message);
        }
    };

    return [fileList, setFileList, uploadFile];
}