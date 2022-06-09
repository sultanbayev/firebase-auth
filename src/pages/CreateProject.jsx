import { useRef, useState } from "react";
import { Card, Container, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createProject } from "../services/firestore";
import ButtonWithLoading from "../components/ButtonWithLoading";
import { useNavigate } from "react-router-dom";


const CreateProject = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const projectNameRef = useRef();
    const authorNameRef = useRef();
    const customerRef = useRef();

    const navigate = useNavigate();

    const { user } = useSelector(store => store.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            return
        }

        setError('');
        setLoading(true);

        createProject({
            name: projectNameRef.current.value ? projectNameRef.current.value : 'NoName',
            author: authorNameRef.current.value ? authorNameRef.current.value : 'NoName',
            customer: customerRef.current.value ? customerRef.current.value : 'NoName',
            owner: user.uid
        }).then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
            navigate('/projects/' + docRef.id)
        }).catch((error) => {
                setError('Failed to log in. ' + error.code);
        })
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <h2 className="text=center mb-4">Create New Project</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="project-name" className="mb-2">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" ref={projectNameRef} required />
                        </Form.Group>
                        <Form.Group id="author-name" className="mb-2">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="text" ref={authorNameRef} defaultValue={user.displayName} required />
                        </Form.Group>
                        <Form.Group id="customer" className="mb-2">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control type="text" ref={customerRef} required />
                        </Form.Group>
                        <ButtonWithLoading title="create" className="w-100 my-2" type="submit" disabled={loading} isLoading={loading} />
                    </Form>
                    { error && <Alert variant="danger">{error}</Alert> }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CreateProject;