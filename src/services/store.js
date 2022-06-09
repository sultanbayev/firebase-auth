import { combineReducers } from 'redux';
import { projectsReducer } from './reducers/projects';
import { userReducer } from './reducers/user';
import { userAuthReducer } from './reducers/userAuth';

export const rootReducer = combineReducers({
    user: userReducer,
    userAuth: userAuthReducer,
    projects: projectsReducer
});