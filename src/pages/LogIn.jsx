import { useEffect, useRef } from 'react';
import { Alert, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginThunk, resetLoginStatus } from '../services/actions/userAuth';
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from '../services/constants';
import ButtonWithLoading from '../components/ButtonWithLoading';

const LogIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();
    const { loginStatus, loginErrorMessage } = useSelector(store => store.userAuth);
    const isLoading = loginStatus === STATUS_LOADING;
    const hasFailed = loginStatus === STATUS_FAILED;
    const hasSucceeded = loginStatus === STATUS_SUCCESS;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/projects';

    useEffect(() => {
        if (hasSucceeded) {
            navigate(from)
        }
    }, [hasSucceeded])

    useEffect(() => {
        if (!isLoading && loginErrorMessage) {
            dispatch(resetLoginStatus())
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(loginThunk(emailRef.current.value, passwordRef.current.value));
    }

    return (
        <Container style={{ maxWidth: '400px' }}>
            <Card>
                <Card.Body>
                    <h2 className="text=center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <ButtonWithLoading title="Log In" className="w-100 my-2"
                            type="submit" disabled={isLoading} isLoading={isLoading} />
                    </Form>
                    { hasFailed && <Alert variant="danger">{loginErrorMessage}</Alert> }
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                Forgot password? <Link to="/reset-password">Reset</Link>
            </div>
        </Container>
    )
}

export default LogIn;