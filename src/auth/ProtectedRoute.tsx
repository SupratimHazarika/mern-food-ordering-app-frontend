import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return <div className="h-screen flex justify-center items-center">...Loading</div>
    }

    if(isAuthenticated){
        return (<Outlet/>)
    }

    return (<Navigate to="/" replace/>)
}

export default ProtectedRoute;