import React, {useCallback, useState, useEffect} from "react";
import "firebase/auth";
import "antd/dist/antd.css";
import {Form, Upload, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {FormSC, ItemSC, TextInputSC, PasswordInputSC, SubmitButtonSC, UploadButtonSC} from "./styled";
import {auth, storage} from "../../services/firebase";

export function Auth(props: any): JSX.Element {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>([]);

    const registerUser = useCallback(async (event: any) => {
        console.log("email", form.getFieldValue(["email"]), "password", form.getFieldValue(["password"]));
        event.preventDefault();
        try {
            await auth.createUserWithEmailAndPassword(form.getFieldValue(["email"]).trim(), form.getFieldValue(["password"]).trim());
            await auth.signInWithEmailAndPassword(form.getFieldValue(["email"]).trim(), form.getFieldValue(["password"]).trim());
            await storage.ref().child(`images/${fileList[0].name}`).put(fileList[0]);
        } catch(error) {
            console.error(error);
        }
    }, [auth]);

    useEffect(() => {
        console.log(fileList);
    }, [fileList]);

    const fakeLoad = useCallback(async({onError, onSuccess, file}) => {
        try {
            onSuccess(null, file);
            message.success("Picture loaded");
        } catch (e){
            message.error("Some error occured");
            onError(e);
        }
    },[]);

    const addFiles = useCallback(({file}) => {
        setFileList([file]);
        console.log("file list");
        console.log(fileList);
    }, []);

    return (
        <>
            <FormSC
                onSubmitCapture={registerUser}
                form={form}
                name="register"
            >
                <ItemSC
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "invalid email",
                        },
                        {
                            required: true,
                            message: "email field can't be empty",
                        }
                    ]}
                >
                    <TextInputSC/>
                </ItemSC>
                <ItemSC
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        () => ({validator(_ ,value) {
                            if (value === "" || value.length > 10){
                                console.log(value);
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error("Too easy password"));
                            }
                        },
                        }),
                    ]}
                    hasFeedback
                >
                    <PasswordInputSC/>
                </ItemSC>
                <ItemSC
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The two passwords that you entered do not match!"));
                            },
                        }),
                    ]}
                >
                    <PasswordInputSC />
                </ItemSC>
                <ItemSC
                    name="avatar"
                    label="Profile picture"
                >
                    <ImgCrop rotate>
                        <Upload
                            customRequest={fakeLoad}
                            fileList={fileList}
                            onChange={addFiles}
                        >
                            <UploadButtonSC
                                icon={<UploadOutlined/>}
                            >
                                Upload
                            </UploadButtonSC>
                        </Upload>
                    </ImgCrop>
                </ItemSC>
                <ItemSC>
                    <SubmitButtonSC htmlType="submit">
                        Sign Up
                    </SubmitButtonSC>
                </ItemSC>
            </FormSC>
        </>
    );
}
