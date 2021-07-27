import React, {useEffect, useState} from "react";
import {Auth} from "../components/auth";
import firebase from "firebase/app";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import {config} from "../services/firebase";

export function App(): JSX.Element {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <Auth/>
        </FirebaseAuthProvider>
    );
}
