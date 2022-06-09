import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const ProtectedRoute = () => {
    
    const { user, isUserRequest } = useSelector(store => store.user);
    const location = useLocation();

    if (isUserRequest) return <Loading />

    if (user) {
        if (!user.emailVerified) {
            return <Navigate to="/verify-email" />
        }
        return <Outlet />
    }

    return <Navigate to="/login" state={{ from: location }} replace />
    
}

export default ProtectedRoute;