import {
    SET_USER,
    SET_USER_REQUEST,
} from "../actions/user"

const initialState = {
    user: null,
    isUserRequest: true,
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_USER_REQUEST: {
            return {
                ...state,
                isUserRequest: action.payload
            }
        }
        default: {
            return state
        }
    }
}