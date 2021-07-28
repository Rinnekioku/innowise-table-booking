import React, {useCallback, useState} from "react";
import "./style.less";
import {Form, Upload, message, Input, Button, PageHeader} from "antd";
import {FormSC} from "./styled";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {auth, storage} from "../../services/firebase";

export function Auth(props: any): JSX.Element {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

    const registerUser = useCallback(async (event: any) => {
        event.preventDefault();
        try {
            await auth.createUserWithEmailAndPassword(form.getFieldValue(["email"]).trim(), form.getFieldValue(["password"]).trim());
            await auth.signInWithEmailAndPassword(form.getFieldValue(["email"]).trim(), form.getFieldValue(["password"]).trim());

            const userId = auth.currentUser === null ? "anonymous" : auth.currentUser.uid;
            const imgFile = storage.ref().child(`images/${userId}.png`);
            const metadata = {
                contentType: "image/jpeg",
            };
            const file = fileList[0];

            await imgFile.put(file, metadata);
            message.success("Signed up successfully");
        } catch(e) {
            message.error(e.message);
            console.error(e);
        }
    }, [auth]);

    const fakeLoad = useCallback(async({onError, onSuccess, file}) => {
        try {
            setFileList([file]);
            message.success("Picture added successfully");
        } catch(e) {
            onError(e);
            message.error(e.message);
        }
    },[fileList]);

    const onChange = useCallback(({file}) => {
        if (file.status === "removed"){
            setFileList([]);
        }
    }, [fileList]);

    return (
        <FormSC
            onSubmitCapture={registerUser}
            form={form}
            name="register"
        >
            <PageHeader
                title="Sign up"
            />
            <Form.Item
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
                <Input/>
            </Form.Item>
            <Form.Item
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
                <Input.Password/>
            </Form.Item>
            <Form.Item
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
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="avatar"
                label="Profile picture"
            >
                <ImgCrop rotate>
                    <Upload
                        customRequest={fakeLoad}
                        fileList={fileList}
                        onChange={onChange}
                    >
                        <Button
                            icon={<UploadOutlined/>}
                        >
                            Upload
                        </Button>
                    </Upload>
                </ImgCrop>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </FormSC>
    );
}
