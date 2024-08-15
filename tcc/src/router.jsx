import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import PostsPage from "./pages/PostsPage.jsx"
import Interations from "./pages/Interations.jsx"
import UserPage from "./pages/UserPage.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/:userIdUrl",
    element: <UserPage />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/interations",
    element: <Interations />,
  },
])
