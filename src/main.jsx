import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth, UserConsole, Home, Docs, PageNotFound, Users, Contact, About, PrivacyPolicy, TermsAndConditions, FAQ } from './pages/export.js'
import { Projects, Profile, Dashboard } from "./components/export.js"
import { AuthLayout, AdminLayout } from "./components/export.js"
import ThemeProvider from "./context/themeContext.jsx"
import AuthProvider from './context/authContext.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/docs",
          element: <Docs />,
        },
        {
          path: "/auth",
          element: (<AuthLayout authentication={false}>
            <Auth />
          </AuthLayout>),
        },
        {
          path: "/projects",
          element: (<AuthLayout authentication={true}>
            <Projects />
          </AuthLayout>),
        },
        {
          path: "/profile",
          element: (<AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>),
        },
        {
          path: "/dashboard/:projectId",
          element: (<AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>),
        },
        {
          path: "/users",
          element: (<AdminLayout>
            <Users />
          </AdminLayout>)
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/faqs",
          element: <FAQ />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms",
          element: <TermsAndConditions />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </AuthProvider>
)
