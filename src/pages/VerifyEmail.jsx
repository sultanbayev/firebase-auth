import { useEffect } from "react";
import { Card, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk, resetVerifyEmailStatus } from "../services/actions/userAuth";
import { verifyEmailThunk } from "../services/actions/userAuth";
import { STATUS_FAILED, STATUS_LOADING, STATUS_SUCCESS } from "../services/constants";
import ButtonWithLoading from "../components/ButtonWithLoading";

const VerifyEmail = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user);
    const { verifyEmailStatus, verifyEmailErrorMessage } = useSelector(store => store.userAuth);
    const isLoading = verifyEmailStatus === STATUS_LOADING;
    const hasFailed = verifyEmailStatus === STATUS_FAILED;
    const hasSucceeded = verifyEmailStatus === STATUS_SUCCESS;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && verifyEmailErrorMessage) {
            dispatch(resetVerifyEmailStatus())
        }
    //eslint-disable-next-line
    }, [])

    const handleSend = () => {
        dispatch(verifyEmailThunk());
    }

    const handleLogout = () => {
        dispatch(logoutThunk(navigate))
    }

    return (
            <Container style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        A verification mail has been sent to your <strong>{user?.email}</strong> email address. Please check your inbox to verify.
                        <ButtonWithLoading title="Send again" className="w-100 my-2" disabled={isLoading} isLoading={isLoading} onClick={handleSend} />
                        { hasFailed
                            ? <Alert variant="danger">{verifyEmailErrorMessage}</Alert>
                            : hasSucceeded
                                ? <Alert variant="success">Verification email has been sent</Alert>
                                : null
                        }
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    {/* eslint-disable-next-line */}
                    Not you? <a href="#" onClick={handleLogout}>Log Out</a>
                </div>
            </Container>
    )
}

export default VerifyEmail;