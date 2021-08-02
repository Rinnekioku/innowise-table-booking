import {EmailField} from './email';
import {PasswordField} from './password';
import {PasswordConfirmField} from './password-confirm';
import {UploadProfilePicture} from './upload';
import {SubmitButton} from './submit';
import {AuthRedirict} from './redirict';
import { Rule } from 'rc-field-form/lib/interface';

export interface FormFieldEntity {
    name: string,
    dependencies?: string[],
    placeholder: string,
    rules?: Rule[],
    hasFeedback: boolean,
}

export {EmailField, PasswordField, PasswordConfirmField, UploadProfilePicture, SubmitButton, AuthRedirict};
