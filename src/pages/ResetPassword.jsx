import { useEffect, useRef, useState } from 'react';
import { Container, Form, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetResetPasswordStatus } from '../services/actions/userAuth';
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from '../services/constants';
import { resetPasswordThunk } from '../services/actions/userAuth';
import ButtonWithLoading from '../components/ButtonWithLoading';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const { resetPasswordStatus, resetPasswordErrorMessage } = useSelector(store => store.userAuth);
    const isLoading = resetPasswordStatus === STATUS_LOADING;
    const hasSucceeded = resetPasswordStatus === STATUS_SUCCESS;
    const hasFailed = resetPasswordStatus === STATUS_FAILED;

    const emailRef = useRef();

    useEffect(() => {
        if (!isLoading && resetPasswordErrorMessage) {
            dispatch(resetResetPasswordStatus())
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(resetPasswordThunk(emailRef.current.value));
    }

    return (
        <Container style={{ maxWidth: '400px' }}>
            <Card>
                <Card.Body>
                    <h2 className="text=center mb-4">Reset Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <ButtonWithLoading title="Send Reset Link" className="w-100 my-2" type="submit"
                            disabled={isLoading} isLoading={isLoading} />
                    </Form>
                    { hasFailed
                        ? <Alert variant="danger">{resetPasswordErrorMessage}</Alert>
                        : hasSucceeded
                            ? <Alert variant="success">Password reset link has been sent to your email</Alert>
                            : null
                    }
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Back to <Link to="/login">Log In</Link>
            </div>
        </Container>
    )
}

export default ResetPassword;