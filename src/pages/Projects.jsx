import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { onSnapshot } from "@firebase/firestore";
import { projectsRef } from "../services/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProjects, setProjectsRequest } from "../services/actions/projects";

const Projects = () => {

    const dispatch = useDispatch();
    const { projects, isProjectsRequest } = useSelector(store => store.projects);

    useEffect(() => {
        const unsubscriber = onSnapshot(projectsRef, (snapshot) => {
            let projects = [];
            snapshot.docs.forEach(doc => {
                projects.push({ ...doc.data(), id: doc.id })
            });

            dispatch(setProjects(projects));

            if (isProjectsRequest) {
                dispatch(setProjectsRequest(false));
            }
        });
        return unsubscriber;
        //eslint-disable-next-line
    }, []);

    return (
        <Container>
            <div className="mb-4"><Link to="new">Create New</Link></div>

            { isProjectsRequest ? 'Loading...' : projects.map((project) => {
                return (
                    <Card className="mb-2" key={project.id}>
                        <Card.Header className="d-flex justify-content-between">
                            <div><Link to={project.id}>{project.name}</Link></div>
                            <div><Link to={ `${project.id}/edit` }>Edit</Link></div>
                        </Card.Header>
                        <Card.Body>
                            <div><strong>Author: </strong>{project.author}</div>
                            <div><strong>Customer: </strong>{project.customer ? project.customer : 'empty'}</div>
                        </Card.Body>
                    </Card> );
            }) }
        </Container>
    );
}

export default Projects;