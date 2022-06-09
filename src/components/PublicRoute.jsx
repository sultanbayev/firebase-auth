import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const ProtectedRoute = () => {
    
    const { user, isUserRequest } = useSelector(store => store.user);
    const location = useLocation();
    const isVerifyEmail = location.pathname === '/verify-email';

    if (isUserRequest) return <Loading />

    if (!user && isVerifyEmail) {
        return <Navigate to="/" />
    }

    if (user && user.emailVerified) {
        return <Navigate to="/projects" />
    }

    if (user && !user.emailVerified && !isVerifyEmail) {
        return <Navigate to="/verify-email" />
    }

    return <Outlet />
}

export default ProtectedRoute;