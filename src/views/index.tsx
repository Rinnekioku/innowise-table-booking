import React, {useEffect, useState} from 'react';
import {SignUp, SignIn} from '../components/auth';
import firebase from 'firebase/app';
import {FirebaseAuthProvider} from '@react-firebase/auth';
import {config} from '../services/firebase';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthLinks} from './routes';
import {SignUpConfig, SignInConfig} from '../components/auth/configs';

export function App(): JSX.Element {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    return (
        <Router>
            <FirebaseAuthProvider {...config} firebase={firebase}>
                <Switch>
                    <Redirect exact from='/' to={AuthLinks.signUp} />
                    <Route exact path={AuthLinks.signUp}>
                        <SignUp
                            config={SignUpConfig}
                        />
                    </Route>
                    <Route path={AuthLinks.signIn}>
                        <SignIn
                            config={SignInConfig}
                        />
                    </Route>
                </Switch>
            </FirebaseAuthProvider>
        </Router>
    );
}
