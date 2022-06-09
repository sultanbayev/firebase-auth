import { SET_PROJECTS, SET_PROJECTS_REQUEST } from "../actions/projects"

const initialState = {
    projects: [],
    isProjectsRequest: true,
}

export const projectsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROJECTS: {
            return {
                ...state,
                projects: action.payload
            }
        }
        case SET_PROJECTS_REQUEST: {
            return {
                ...state,
                isProjectsRequest: action.payload
            }
        }
        default: {
            return state
        }
    }
}