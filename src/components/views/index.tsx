import React, { useEffect, useReducer } from 'react';
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
import { Reservations } from '../reservations';
import { ReservationsBreadcrumb } from '../../core/routes/reservations';
import { SignInConfig, SignUpConfig } from '../../core/configs';
import { SignIn, SignUp } from '../auth';
import { FormDataContext, formDataContextReducer, initialFromDataContextState } from './components/auth/reducer';

export function App(): JSX.Element {
    i18nextInit('en');

    const dispatch = useDispatch();
    const [authState, authDispatch] = useReducer(formDataContextReducer, initialFromDataContextState);

    useEffect(() => {
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
        <FormDataContext.Provider value={[authState, authDispatch]}>
            <Router>
                <Header/>
                <ContentsSC> 
                    <Switch>
                        <Redirect exact from='/' to={AuthLinks.signUp} />
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

                        <PrivateRoute
                            exact
                            path={ContentLinks.userReservations}
                        >
                            <Reservations
                                routes={ReservationsBreadcrumb}
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
        </FormDataContext.Provider>
    );
}
