import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home';
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../layout/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {path: '/', element: <Home />},
            {path: '/login', element: <Login />},
            {path: '/register', element: <Register />},
        ]
    }
])

export default router;