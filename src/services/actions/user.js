export const SET_USER = 'SET_USER';
export const SET_USER_REQUEST = 'SET_USER_REQUEST';

export const setUser = (user) => {
    return { type: SET_USER, payload: user }
}

export const setUserRequest = (isUserRequest) => {
    return { type: SET_USER_REQUEST, payload: isUserRequest }
}