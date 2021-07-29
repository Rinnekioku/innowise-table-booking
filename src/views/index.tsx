import React, {useEffect, useState} from 'react';
import {SignUp, SignIn} from '../components/auth';
import firebase from 'firebase/app';
import {FirebaseAuthProvider} from '@react-firebase/auth';
import {config} from '../services/firebase';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthLinks} from './routes';

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
                        <SignUp/>
                    </Route>
                    <Route path={AuthLinks.signIn}>
                        <SignIn/>
                    </Route>
                </Switch>
            </FirebaseAuthProvider>
        </Router>
    );
}
