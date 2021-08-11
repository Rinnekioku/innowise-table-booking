import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthLinks, ContentLinks } from '../../core/routes';
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
import { AuthReducerActions } from '../../core/redux/reducers/auth/actions';
import { AuthRoute } from './components/auth';

export function App(): JSX.Element {
    i18nextInit('en');

    const dispatch = useDispatch();

    useEffect(() => {
        auth.signOut();
        auth.onAuthStateChanged((user) => {
            if (user){
                dispatch({
                    type: AuthReducerActions.signIn, 
                    payload:  user.uid,
                });
            }
        });
    }, [dispatch]);

    return (
        <Router>
            <Header/>
            <ContentsSC>

                <AuthRoute/>

                <Switch>
                    <Redirect exact from='/' to={AuthLinks.signIn} />

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
