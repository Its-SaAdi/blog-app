import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router'

import AuthLayout from './components/Auth-Layout/AuthLayout.jsx'
import Posts from './pages/Posts.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import MyPosts from './pages/MyPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <Login />
              </AuthLayout>
          ),
      },
      {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <Signup />
              </AuthLayout>
          ),
      },
      {
          path: "/all-posts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <MyPosts />
              </AuthLayout>
          ),
      },
      {
          path: "/add-post",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
