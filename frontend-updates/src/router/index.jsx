import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Cryptocurrencies from "../pages/Cryptocurrencies/Cryptocurrencies";
import { individualsRoutes } from "../pages/Individuals/individualsRoutes";
import { businessesRoutes } from "../pages/Businesses/businessesRoutes";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cryptocurrencies", element: <Cryptocurrencies /> },
      // Auth pages (keep /signup as alias for backward compat)
      { path: "signup", element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      // Protected profile route
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      ...individualsRoutes,
      ...businessesRoutes,
    ],
  },
]);

export default router;
