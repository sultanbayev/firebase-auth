export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECTS_REQUEST = 'SET_PROJECTS_REQUEST';

export const setProjects = (projects) => {
    return { type: SET_PROJECTS, payload: projects }
}

export const setProjectsRequest = (isProjectsRequest) => {
    return { type: SET_PROJECTS_REQUEST, payload: isProjectsRequest }
}