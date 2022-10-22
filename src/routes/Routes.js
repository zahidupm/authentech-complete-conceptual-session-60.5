import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home';
import Login from "../components/Login";
import Profile from '../components/Profile';
import Register from "../components/Register";
import Wallet from '../components/Wallet';
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {path: '/', element: <Home />},
            {path: '/home', element: <Home />},
            {path: '/login', element: <Login />},
            {path: '/register', element: <Register />},
            {path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute>},
            {path: '/wallet', element: <PrivateRoute><Wallet /></PrivateRoute>},
        ]
    }
])

export default router;