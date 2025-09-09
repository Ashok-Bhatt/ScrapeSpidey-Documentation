import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth, UserConsole, Home, Docs, PageNotFound } from './pages/export.js'
import {AuthLayout, Dashboard} from "./components/export.js"
import ThemeProvider from "./context/themeContext.jsx"
import AuthProvider from './context/authContext.jsx'
import ApiKeyProvider from './context/apiKeyContext.jsx'


const router = createBrowserRouter(
  [
    {
      path : "/",
      element: <App/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/docs",
          element: <Docs/>,
        },
        {
          path: "/auth",
          element: (<AuthLayout authentication={false}>
            <Auth/>
          </AuthLayout>),
        },
        {
          path: "/user-console",
          element: (<AuthLayout authentication={true}>
            <UserConsole/>
          </AuthLayout>),
        },
        {
          path: "*",
          element: <PageNotFound/>,
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ApiKeyProvider>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </ApiKeyProvider>
  </AuthProvider>
)
