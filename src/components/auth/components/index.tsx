import {EmailField} from './email';
import {PasswordField} from './password';
import {PasswordConfirmField} from './password-confirm';
import {UploadProfilePicture} from './upload';
import {SubmitButton} from './submit';
import {AuthRedirict} from './redirict';

export interface FormFieldEntity {
    name: string,
    dependencies?: string[],
    placeholder: string,
    rules?: any[],
    hasFeedback: boolean,
}

export {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict};
