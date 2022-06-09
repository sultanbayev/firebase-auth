import { login, logout, sendVerifyEmail, signup, resetPassword, updateName } from "../auth";
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from "../constants";

export const SET_SIGNUP_STATUS = 'SET_SIGNUP_STATUS';
export const SET_SIGNUP_ERROR_MESSAGE = 'SET_SIGNUP_ERROR_MESSAGE';
export const RESET_SIGNUP_STATUS = 'RESET_SIGNUP_STATUS';

export const SET_VERIFY_EMAIL_STATUS = 'SET_VERIFY_EMAIL_STATUS';
export const SET_VERIFY_EMAIL_ERROR_MESSAGE = 'SET_VERIFY_EMAIL_ERROR_MESSAGE';
export const RESET_VERIFY_EMAIL_STATUS = 'RESET_VERIFY_EMAIL_STATUS';

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGIN_ERROR_MESSAGE = 'SET_LOGIN_ERROR_MESSAGE';
export const RESET_LOGIN_STATUS = 'RESET_LOGIN_STATUS';

export const SET_RESET_PASSWORD_STATUS = 'SET_RESET_PASSWORD_STATUS';
export const SET_RESET_PASSWORD_ERROR_MESSAGE = 'SET_RESET_PASSWORD_ERROR_MESSAGE';
export const RESET_RESET_PASSWORD_STATUS = 'RESET_RESET_PASSWORD_STATUS';

// signup
export const setSignupStatus = (status) => {
    return { type: SET_SIGNUP_STATUS, payload: status }
}

export const setSignupErrorMessage = (errorMessage) => {
    return { type: SET_SIGNUP_ERROR_MESSAGE, payload: errorMessage }
}

export const resetSignupStatus = () => {
    return { type: RESET_SIGNUP_STATUS }
}

// verify-email
export const setVerifyEmailStatus = (status) => {
    return { type: SET_VERIFY_EMAIL_STATUS, payload: status }
}

export const setVerifyEmailErrorMessage = (errorMessage) => {
    return { type: SET_VERIFY_EMAIL_ERROR_MESSAGE, payload: errorMessage }
}

export const resetVerifyEmailStatus = () => {
    return { type: RESET_VERIFY_EMAIL_STATUS }
}

// login
export const setLoginStatus = (status) => {
    return { type: SET_LOGIN_STATUS, payload: status }
}

export const setLoginErrorMessage = (errorMessage) => {
    return { type: SET_LOGIN_ERROR_MESSAGE, payload: errorMessage }
}

export const resetLoginStatus = () => {
    return { type: RESET_LOGIN_STATUS }
}

// reset-password
export const setResetPasswordStatus = (status) => {
    return { type: SET_RESET_PASSWORD_STATUS, payload: status }
}

export const setResetPasswordErrorMessage = (errorMessage) => {
    return { type: SET_RESET_PASSWORD_ERROR_MESSAGE, payload: errorMessage }
}

export const resetResetPasswordStatus = () => {
    return { type: RESET_RESET_PASSWORD_STATUS }
}


export const signupThunk = (name, email, password) => {
    return (dispatch) => {
        dispatch(setSignupStatus(STATUS_LOADING));
        dispatch(setSignupErrorMessage(''));
        
        signup(email, password)
            .then((credentials) => {
                dispatch(setSignupStatus(STATUS_SUCCESS));

                updateName(name);

                dispatch(verifyEmailThunk());
            })
            .catch((error) => {
                let errorMessage = '';

                if (error.code === 'auth/email-already-in-use' ) {
                    errorMessage = 'Email already in use';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password should be at least 6 characters';
                } else {
                    errorMessage = 'Failed to create an account. ' + error.code;
                }

                dispatch(setSignupStatus(STATUS_FAILED));
                dispatch(setSignupErrorMessage(errorMessage));
            })
    };
}

export const verifyEmailThunk = () => {
    return (dispatch) => {
        dispatch(setVerifyEmailStatus(STATUS_LOADING));
        dispatch(setVerifyEmailErrorMessage(''));
        
        sendVerifyEmail()
            .then(() => {
                dispatch(setVerifyEmailStatus(STATUS_SUCCESS));
            })
            .catch((error) => {
                let errorMessage = 'Failed to send verification link. ' + error.code;

                dispatch(setVerifyEmailStatus(STATUS_FAILED));
                dispatch(setVerifyEmailErrorMessage(errorMessage));
            })
    }
}

export const loginThunk = (email, password) => {
    return (dispatch) => {
        dispatch(setLoginStatus(STATUS_LOADING));
        dispatch(setLoginErrorMessage(''));

        login(email, password)
            .then(() => {
                dispatch(setLoginStatus(STATUS_SUCCESS));
            })
            .catch((error) => {
                let errorMessage = '';

                if (error.code === 'auth/user-not-found' ) {
                    errorMessage = 'User not found';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Wrong password';
                } else if (error.code === 'auth/user-disabled') {
                    errorMessage = 'Disabled User Account';
                } else {
                    errorMessage = 'Failed to log in. ' + error.code;
                }
                
                dispatch(setLoginStatus(STATUS_FAILED))
                dispatch(setLoginErrorMessage(errorMessage));
            })
    }
}

export const logoutThunk = (navigate) => {
    return (dispatch) => {
        logout()
            .then(() => {
                dispatch(resetLoginStatus());
                navigate("/login");
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const resetPasswordThunk = (email) => {
    return (dispatch) => {
        dispatch(setResetPasswordStatus(STATUS_LOADING));
        dispatch(setResetPasswordErrorMessage(''));

        resetPassword(email)
            .then(() => {
                dispatch(setResetPasswordStatus(STATUS_SUCCESS));
            })
            .catch((error) => {
                let errorMessage = '';

                if (error.code === 'auth/user-not-found' ) {
                    errorMessage = 'User not found';
                } else {
                    errorMessage = 'Failed to send link. ' + error.code;
                }

                dispatch(setResetPasswordStatus(STATUS_FAILED));
                dispatch(setResetPasswordErrorMessage(errorMessage));
            })
    }
}