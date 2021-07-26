import React, {useCallback, useState, useEffect} from "react";
import {config, app} from "../../services/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider} from "@react-firebase/auth";

export function Register(props: any): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    const handleEmailChange = useCallback((event) => {
        setEmail(event.target.value);
        console.log(email);
    }, [email]);

    const handlePasswordChange = useCallback((event) => {
        setPassword(event.target.value);
        console.log(password);
    }, [password]);

    const registerUser = useCallback(async (event: any) => {
        console.log("email", email, "password", password);
        event.preventDefault();
        try {
            await app.auth().createUserWithEmailAndPassword(email.trim(), password.trim());
        } catch(error) {
            console.error(error);
        }
    }, [app]);

    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <form onSubmit={registerUser}>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" onChange={handleEmailChange} value={email}/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" onChange={handlePasswordChange} value={password}/>
                </label>
                <button type="submit">
                    Register
                </button>
            </form>
        </FirebaseAuthProvider>
    );
}
