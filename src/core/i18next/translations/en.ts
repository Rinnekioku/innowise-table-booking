export default
{
    translation: {
        header: {
            title: 'Innowise Table Booking',
        },
        auth: {
            email: {
                placeholder: 'Enter your email(@innowise-group.com)',
                invalidEmailErrorMessage: 'Please use email that ends with @innowise-group.com',
                emptyEmailFieldErrorMessage: 'Email field is required',     
            },
            password: {
                placeholder: 'Enter password',
                emptyPasswordFieldErrorMessage: 'Password field is required',
                easyPasswordErrorMessage: 'Password must contain one number, lower and upper case latin letters, at least 8 characters'
            },
            passwordConfirm: {
                placeholder: 'Confirm password',
                emptyConfirmPasswordFieldErrorMessage: 'Confirm password field is required',
                invalidConfirmPasswordErrorMessage: 'The two passwords that you entered do not match!'
            },
            upload: {
                buttonText: 'Upload',
            },
            signUp: {
                buttonText: 'Sign up',
                redirictText: 'Already have account? ',
                linkText: 'Sign in',
                successSignUpMessage: 'Signed up successfully',
            },
            signIn: {
                buttonText: 'Sign in',
                redirictText: 'Don\'t have account yet? ',
                linkText: 'Sign up',
                successSignInMessage: 'Signed in successfully',
            }
        },
        offices: {
            title: 'Offices',
            loadingOffices: 'Loading...',
            noOfficesError: 'Sorry we don\'t have offices yet'
        },
        rooms: {
            title: 'Rooms',
            loadingRooms: 'Loading...',
            noRoomsError: 'Sorry we don\'t have rooms in this office yet'
        },
        notFound: '404. Sorry, no matches',
    }
};
