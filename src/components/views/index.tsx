import React, { useEffect } from 'react';
import { SignUp, SignIn } from '../auth';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
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
import { PublicRoute } from '../../core/constants/publicRoute';

export function App(): JSX.Element {
    i18nextInit('en');

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user){
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

                    <PublicRoute 
                        exact 
                        path={AuthLinks.signUp} 
                        restricted
                    >
                        <SignUp
                            config={SignUpConfig}
                        />
                    </PublicRoute>

                    <PublicRoute 
                        exact 
                        path={AuthLinks.signIn} 
                        restricted
                    >
                        <SignIn
                            config={SignInConfig()}
                        />
                    </PublicRoute>

                    <PrivateRoute 
                        exact 
                        path={ContentLinks.offices}
                    >
                        <Offices
                            routes={OfficesBreadcrumbs}
                        />
                    </PrivateRoute>

                    <PrivateRoute 
                        exact
                        path={ContentLinks.rooms}
                    >
                        <Rooms
                            routes={RoomsBreadcrumb}
                        />
                    </PrivateRoute>

                    <PrivateRoute 
                        exact
                        path={ContentLinks.tables}
                    >
                        <Tables
                            routes={TablesBreadcrumb}
                        />
                    </PrivateRoute>

                    <PublicRoute 
                        path={ContentLinks.notFound}
                        restricted={false}
                    >
                        <NotFound/>
                    </PublicRoute>
                </Switch>
            </ContentsSC>
        </Router>
    );
}
