import { Outlet } from 'react-router-dom';
import storageService from '../StorageService/storageService';

const ProtectedRoutes = ({ roleName }) => {
    const user = storageService.getItem('userInfo');
    if (user !== null) {
        switch (roleName) {
            case 'admin':
                return user.role === 'admin' ? <Outlet /> : (window.location.href = '/NotAuthorized');
        }
    } else {
        window.location.href = '/NotAuthorized';
    }
};
export default ProtectedRoutes;
