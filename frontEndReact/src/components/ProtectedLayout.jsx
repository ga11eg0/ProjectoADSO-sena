import MainLayout from "../layouts/MainLayout";

function ProtectedLayout({ isAuthenticated }) {

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <MainLayout />;
}

export default ProtectedLayout; 