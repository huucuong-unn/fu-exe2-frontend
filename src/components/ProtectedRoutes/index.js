import { Outlet, Navigate } from 'react-router-dom';
import storageService from '../StorageService/storageService';

const ProtectedRoutes = ({ roleName }) => {
    const user = storageService.getItem('userInfo');
    if (user !== null) {
        switch (roleName) {
            case 'admin':
                return user.role == 'admin' ? <Outlet /> : <Navigate to="/NotAuthoried" />;
            case 'company':
                return user.role == 'company' ? <Outlet /> : <Navigate to="/NotAuthoried" />;
            case 'mentor':
                return user.role == 'mentor' ? <Outlet /> : <Navigate to="/NotAuthoried" />;
            case 'student':
                return user.role == 'student' ? <Outlet /> : <Navigate to="/NotAuthoried" />;
        }
    } else {
        <Navigate to="/NotAuthoried" />;
    }
};
export default ProtectedRoutes;
