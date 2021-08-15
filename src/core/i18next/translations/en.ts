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
            loadingOffices: 'Offices are loading...',
            noOfficesError: 'Sorry we don\'t have offices yet',
            viewOffice: 'View office',
        },
        rooms: {
            title: 'Rooms',
            loadingRooms: 'Rooms are loading...',
            noRoomsError: 'Sorry we don\'t have rooms in this office yet',
            viewRoom: 'View room',
        },
        tables: {
            title: 'Tables',
            loadingTables: 'Tables are loading...',
            noTablesError: 'Sorry, we don\'t have tables in this room yet',
            bookTable: 'Book table'
        },
        book: {
            modalTitle: 'Book table',
            tableUnavailable: 'Table isn\'t available for this date',
            alreadyBooked: 'You already booked another table in this time interval, you can\'t book two tables on one time interval',
            bookedSuccessfully: 'You booked table successfully, have a nice day',
        },
        breadcrumbNames: {
            home: 'Home',
            offices: 'Offices',
            rooms: 'Rooms',
            tables: 'Tables',
        },
        notFound: '404. Sorry, no matches',
    }
};
