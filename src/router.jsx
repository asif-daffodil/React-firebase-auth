import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/sign-up",
            element: <SignUp />
        },
        {
            path: "/sign-in",
            element: <SignIn />
        }
    ]
  },
]);

export default router;