
import { Container } from "react-bootstrap";
import ChangeName from "../components/ChangeName";
import { useSelector } from "react-redux";

const Profile = () => {

    const { user } = useSelector(store => store.user)

    return (
        <Container>
            <div className="mb-3" ><strong>Full name: </strong>
                { user.displayName ? user.displayName : 'not set' }
            </div>
            <div className="mb-3" style={{ maxWidth: '400px' }}>
                <ChangeName />
            </div>
        </Container>
    );
}

export default Profile;

