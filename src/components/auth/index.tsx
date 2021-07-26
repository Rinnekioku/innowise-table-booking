import React, {useCallback, useState, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "antd/dist/antd.css";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import {config, app} from "../../services/firebase";
import { Form, Input, Button} from "antd";
import {FormSC, ItemSC, TextInputSC, PasswordInputSC, ButtonSC} from "./styled";

export function Auth(props: any): JSX.Element {
    const [form] = Form.useForm();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    const registerUser = useCallback(async (event: any) => {
        console.log("email", form.getFieldValue(["email"]), "password", form.getFieldValue(["password"]));
        event.preventDefault();
        try {
            await app.auth().createUserWithEmailAndPassword(form.getFieldValue(["email"]).trim(), form.getFieldValue(["password"]).trim());
        } catch(error) {
            console.error(error);
        }
    }, [app]);

    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
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
                    ]}
                    hasFeedback
                >
                    <PasswordInputSC/>
                </ItemSC>
                <ItemSC>
                    <ButtonSC htmlType="submit">
                        Sign Up
                    </ButtonSC>
                </ItemSC>
            </FormSC>
        </FirebaseAuthProvider>
    );
}
