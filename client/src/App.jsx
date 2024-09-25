import { ThemeProvider } from "@/components/theme-provider";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <NavBar />
      <Outlet className="flex-grow"/>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/caso/:id",
        element: <SinglePost />,
      },
      {
        path: "/crear",
        element: <Write />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrarse",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app flex justify-center w-full">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <div className="container"> */}
          <RouterProvider router={router} />
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
