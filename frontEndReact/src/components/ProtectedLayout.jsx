import MainLayout from "../layouts/MainLayout";
import {Navigate} from 'react-router-dom'

function ProtectedLayout({ isAuthenticated, onLogout }) {

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <MainLayout onLogout={onLogout} />;
}

export default ProtectedLayout; 