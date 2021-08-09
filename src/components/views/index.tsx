import React, { useEffect } from 'react';
import { SignUp, SignIn } from '../auth';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthLinks, ContentLinks } from '../../core/routes';
import { SignUpConfig, SignInConfig } from '../../core/configs';
import { Offices } from '../offices';
import { Header } from './components/header';
import { ContentsSC } from '../../core/styles/styled';
import i18nextInit from '../../core/i18next';
import { NotFound } from './components/notFound';
import { OfficesBreadcrumbs } from '../../core/routes';
import { Rooms } from '../rooms';
import { RoomsBreadcrumb } from '../../core/routes/rooms';
import { Tables } from '../tables';
import { TablesBreadcrumb } from '../../core/routes/tables';
import '../../core/styles/style.less';
import { auth } from '../../core/firebase';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from '../../core/constants/privateRoute';

export function App(): JSX.Element {
    i18nextInit('en');

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user){
                console.log('user id is', user.uid);
                dispatch({
                    type: 'SET_USER', 
                    payload: {
                        isLoggedIn: true,
                        userId: user.uid
                    }
                });
            }
        });
    }, [dispatch]);

    return (
        <Router>
            <Header/>
            <ContentsSC>
                <Switch>
                    <Redirect exact from='/' to={AuthLinks.signIn} />
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
                    <PrivateRoute exact path={ContentLinks.offices}>
                        <Offices
                            routes={OfficesBreadcrumbs}
                        />
                    </PrivateRoute>
                    <PrivateRoute exact path={ContentLinks.rooms}>
                        <Rooms
                            routes={RoomsBreadcrumb}
                        />
                    </PrivateRoute>
                    <PrivateRoute exact path={ContentLinks.tables}>
                        <Tables
                            routes={TablesBreadcrumb}
                        />
                    </PrivateRoute>
                    <Route path={ContentLinks.notFound}>
                        <NotFound/>
                    </Route>
                </Switch>
            </ContentsSC>
        </Router>
    );
}
