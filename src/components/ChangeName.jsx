import { useRef, useState } from "react";
import { Alert, Button, Spinner, Card, Form } from "react-bootstrap";
import { updateName } from "../services/auth";

const ChangeName = () => {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const nameRef = useRef();
    const formRef = useRef();

    const resetInputs = () => {
        formRef.current.reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');
        setMessage('');
        setLoading(true);
        
        updateName(nameRef.current.value)
            .then(() => {
                setMessage('Name has been updated');
                resetInputs();
            })
            .catch((error) => {
                setError('Failed to change password. ' + error.code);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Change Name</Card.Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group id="full-name" className="mb-2">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button className="w-100 mt-2 mb-4" type="submit" disabled={loading}>
                        { loading && ( <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> ) }
                        { loading ? 'Loading...' : 'Change' }
                    </Button>
                </Form>
                { error
                    ? <Alert variant="danger">{error}</Alert>
                    : message
                        ? <Alert variant="success">{message}</Alert>
                        : null
                }
            </Card.Body>
        </Card>
    );
}

export default ChangeName;