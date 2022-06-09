import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import { getProject } from "../services/firestore";

const ProjectPage = () => {

    const [loading, setLoading] = useState(true);
    const [ projectData, setProjectData ] = useState({});
    let urlParams = useParams();

    useEffect(() => {
        getProject(urlParams.projectId)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setProjectData(snapshot.data());
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    //eslint-disable-next-line
    }, []);

    return (
        <Container>
            { loading ? 'Loading...' : (
                <div>
                    <div><strong>Project Name: </strong>{projectData.name}</div>
                    <div><strong>Author: </strong>{projectData.author}</div>
                    <div><strong>Customer: </strong>{projectData.customer}</div>
                    <div><Link to="edit">Edit</Link></div>
                </div>
                )
            }
            
        </Container>
    );
}

export default ProjectPage;