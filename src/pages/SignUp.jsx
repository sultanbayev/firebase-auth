import { useEffect, useRef } from 'react';
import { Container, Form, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetSignupStatus, setSignupErrorMessage, setSignupStatus, signupThunk } from '../services/actions/userAuth';
import { STATUS_FAILED, STATUS_LOADING } from '../services/constants';
import ButtonWithLoading from '../components/ButtonWithLoading';

const SignUp = () => {

    const dispatch = useDispatch();
    const { signupStatus, signupErrorMessage } = useSelector(store => store.userAuth);
    const isLoading = signupStatus === STATUS_LOADING;
    const hasFailed = signupStatus === STATUS_FAILED;

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    useEffect(() => {
        if (!isLoading && signupErrorMessage) {
            dispatch(resetSignupStatus())
        }
    //eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            dispatch(setSignupStatus(STATUS_FAILED));
            dispatch(setSignupErrorMessage('Passwords doesn\'t match!'));
            return;
        }

        dispatch(signupThunk(nameRef.current.value, emailRef.current.value, passwordRef.current.value));
    }

    return (
        <Container style={{ maxWidth: '400px' }}>
            <Card>
                <Card.Body>
                    <h2 className="text=center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="fullName" className="mb-2">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <ButtonWithLoading title="Sing Up" className="w-100 my-2" type="submit"
                            disabled={isLoading} isLoading={isLoading} />
                    </Form>
                    { hasFailed && <Alert variant="danger">{ signupErrorMessage }</Alert> }
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </Container>
    )
}

export default SignUp;