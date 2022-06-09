import {
    SET_SIGNUP_STATUS,
    SET_SIGNUP_ERROR_MESSAGE,
    SET_VERIFY_EMAIL_STATUS,
    SET_VERIFY_EMAIL_ERROR_MESSAGE,
    RESET_SIGNUP_STATUS,
    RESET_VERIFY_EMAIL_STATUS,
    SET_LOGIN_STATUS,
    SET_LOGIN_ERROR_MESSAGE,
    RESET_LOGIN_STATUS,
    SET_RESET_PASSWORD_STATUS,
    SET_RESET_PASSWORD_ERROR_MESSAGE,
    RESET_RESET_PASSWORD_STATUS,
} from "../actions/userAuth"
import { STATUS_IDLE } from "../constants"

const initialState = {
    signupStatus: STATUS_IDLE,
    signupErrorMessage: '',

    verifyEmailStatus: STATUS_IDLE,
    verifyEmailErrorMessage: '',

    loginStatus: STATUS_IDLE,
    loginErrorMessage: '',

    resetPasswordStatus: STATUS_IDLE,
    resetPasswordErrorMessage: '',
}

export const userAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SIGNUP_STATUS: {
            return {
                ...state,
                signupStatus: action.payload
            }
        }
        case SET_SIGNUP_ERROR_MESSAGE: {
            return {
                ...state,
                signupErrorMessage: action.payload
            }
        }
        case RESET_SIGNUP_STATUS: {
            return {
                ...state,
                signupStatus: STATUS_IDLE,
                signupErrorMessage: ''
            }
        }
        case SET_VERIFY_EMAIL_STATUS: {
            return {
                ...state,
                verifyEmailStatus: action.payload
            }
        }
        case SET_VERIFY_EMAIL_ERROR_MESSAGE: {
            return {
                ...state,
                verifyEmailErrorMessage: action.payload
            }
        }
        case RESET_VERIFY_EMAIL_STATUS: {
            return {
                ...state,
                verifyEmailStatus: STATUS_IDLE,
                verifyEmailErrorMessage: ''
            }
        }
        case SET_LOGIN_STATUS: {
            return {
                ...state,
                loginStatus: action.payload
            }
        }
        case SET_LOGIN_ERROR_MESSAGE: {
            return {
                ...state,
                loginErrorMessage: action.payload
            }
        }
        case RESET_LOGIN_STATUS: {
            return {
                ...state,
                loginStatus: STATUS_IDLE,
                loginErrorMessage: ''
            }
        }
        case SET_RESET_PASSWORD_STATUS: {
            return {
                ...state,
                resetPasswordStatus: action.payload
            }
        }
        case SET_RESET_PASSWORD_ERROR_MESSAGE: {
            return {
                ...state,
                resetPasswordErrorMessage: action.payload
            }
        }
        case RESET_RESET_PASSWORD_STATUS: {
            return {
                ...state,
                resetPasswordStatus: STATUS_IDLE,
                resetPasswordErrorMessage: ''
            }
        }
        default: {
            return state
        }
    }
}