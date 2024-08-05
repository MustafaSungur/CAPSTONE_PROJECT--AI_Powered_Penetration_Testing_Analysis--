import UserPrivateRoute from "./Components/UserPrivateRoute";

import Page404 from "./Pages/Page404";

import AuthLaout from "./Pages/auth/AuthLayout";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Contact from "./Pages/home/Contact";
import Home from "./Pages/home/Home";
import HomeLayout from "./Pages/home/HomeLayout";
import Details from "./Pages/user/Details";
import Osint from "./Pages/user/Osint";
import UserDashboard from "./Pages/user/UserDashboard";
import UserLayout from "./Pages/user/UserLayout";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "user",
        element: <UserLayout />,
        auth: true,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
            auth: true,
          },
          {
            path: "dashboard/:id",
            element: <Details />,
            auth: true,
          },
          {
            path: "osint",
            element: <Osint />,
            auth: true,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLaout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

// auth:true admin:false ise userPrivateRoute'a sayfayı child olarak verir. auth:true ve admin:true ise sayfayı AdminPrivateRoute'a child olarak verir.
const authMap = (routes) =>
  routes.map((route) => {
    if (route?.auth) {
      route.element = <UserPrivateRoute>{route.element}</UserPrivateRoute>;
    }

    if (route?.children) {
      route.children = authMap(route.children);
    }
    return route;
  });

export default authMap(routes);
