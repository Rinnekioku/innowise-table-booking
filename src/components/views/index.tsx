import React from 'react';
import { SignUp, SignIn } from '../auth';
import firebase from 'firebase/app';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { config } from '../../core/firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthLinks, ContentLinks } from '../../core/routes';
import { SignUpConfig, SignInConfig } from '../../core/configs';
import { Offices } from '../offices';
import { Header } from './components/header';
import { ContentsSC } from '../../core/styles/styled';
import i18nextInit from '../../core/i18next';
import { NotFound } from './components/notFound';
import { Provider } from 'react-redux';
import { store } from '../../core/redux/index';
import { OfficesBreadcrumbs } from '../../core/routes';
import { Rooms } from '../rooms';
import { RoomsBreadcrumb } from '../../core/routes/rooms';
import { Tables } from '../tables';
import { TablesBreadcrumb } from '../../core/routes/tables';
import '../../core/styles/style.less';

export function App(): JSX.Element {
    i18nextInit('en');

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
                            <Route exact path={AuthLinks.signIn}>
                                <SignIn
                                    config={SignInConfig()}
                                />
                            </Route>
                            <Route exact path={ContentLinks.offices}>
                                <Offices
                                    routes={OfficesBreadcrumbs}
                                />
                            </Route>
                            <Route exact path={ContentLinks.rooms}>
                                <Rooms
                                    routes={RoomsBreadcrumb}
                                />
                            </Route>
                            <Route exact path={ContentLinks.tables}>
                                <Tables
                                    routes={TablesBreadcrumb}
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
