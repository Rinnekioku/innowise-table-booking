import React, { useReducer } from 'react';
import { PublicRoute } from '../../../../core/constants/publicRoute';
import { AuthLinks } from '../../../../core/routes';
import { SignUp, SignIn } from '../../../auth';
import { SignUpConfig, SignInConfig } from '../../../../core/configs';
import { FormDataContext, initialFromDataContextState, formDataContextReducer } from './reducer';
import { Switch } from 'react-router-dom';

export function AuthRoute(): JSX.Element{
    const [state, dispatch] = useReducer(formDataContextReducer, initialFromDataContextState);

    return (
        <FormDataContext.Provider value={[state, dispatch]}>
            <Switch>
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
            </Switch>
        </FormDataContext.Provider>
    );
}
