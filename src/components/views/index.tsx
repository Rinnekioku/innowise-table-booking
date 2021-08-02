import React, {useEffect, useState} from 'react';
import {SignUp, SignIn} from '../auth';
import firebase from 'firebase/app';
import {FirebaseAuthProvider} from '@react-firebase/auth';
import {config} from '../../core/firebase';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthLinks, ContentLinks} from '../../core/routes';
import {SignUpConfig, SignInConfig} from '../../core/configs';
import i18nextInit from '../../core/i18next';
import {Offices} from '../offices';
import {Header} from './components/header';
import {ContentsSC} from '../../core/styles/styled';
import '../../core/styles/style.less';
import {NotFound} from './components/notFound';
import {db} from '../../core/firebase';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../core/redux/index';

export function App(): JSX.Element {
    const [user, setUser] = useState<any>(null);
    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home'
        },
        {
            path: '/offices',
            breadcrumbName: 'Offices'
        }
    ];

    i18nextInit();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, [user]);

    return (
        <Router>
            <FirebaseAuthProvider {...config} firebase={firebase}>
                <Provider store={store}>
                    <Header/>
                    <ContentsSC>
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
                            <Route path={ContentLinks.offices}>
                                <Offices
                                    routes={routes}
                                />
                            
                            </Route>
                            <Route path={ContentLinks.notFound}>
                                <NotFound/>
                            </Route>
                        </Switch>
                    </ContentsSC>
                </Provider>
            </FirebaseAuthProvider>
        </Router>
    );
}
