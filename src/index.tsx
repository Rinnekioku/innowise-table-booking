import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/views';
import firebase from 'firebase/app';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { config } from './core/firebase';
import { Provider } from 'react-redux';
import { store } from './core/redux/index';

ReactDOM.render(
    <React.StrictMode>
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <Provider store={store}>
                <App />
            </Provider>
        </FirebaseAuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
