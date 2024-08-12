import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App'
import { Login } from './components/login'
import { Register } from './components/register'
import { Links } from './components/Links'
import { Home } from './components/home'
import { RequireAuth } from './components/auth'
import { UserProvider } from './services/context'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/home',
        element:
  <RequireAuth><Home /></RequireAuth>,
        children: [
          {
            path: 'home/links',
            element: <Links />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserProvider>
)
