import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth, Home, Docs, PageNotFound, Contact, About, FAQ, Admin, AdminAnalytics, Users, AdminNews, Updates, Projects, Profile, PersonalInfo, Security, DeveloperSettings, Dashboard, DailyApiUsage, RequestData } from './pages/export.js'
import { AuthLayout, AdminLayout } from "./layouts/export.js"
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
          children: [
            {
              index: true,
              element: <PersonalInfo />
            },
            {
              path: "personal",
              element: <PersonalInfo />
            },
            {
              path: "security",
              element: <Security />
            },
            {
              path: "developer",
              element: <DeveloperSettings />
            }
          ]
        },
        {
          path: "/dashboard/:projectId",
          element: (<AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>),
          children: [
            {
              index: true,
              element: <DailyApiUsage />
            },
            {
              path: "daily-usage",
              element: <DailyApiUsage />
            },
            {
              path: "requests",
              element: <RequestData />
            }
          ]
        },
        {
          path: "/admin",
          element: (<AdminLayout>
            <Admin />
          </AdminLayout>),
          children: [
            {
              index: true,
              element: <AdminAnalytics />
            },
            {
              path: "analytics",
              element: <AdminAnalytics />
            },
            {
              path: "users",
              element: <Users />
            },
            {
              path: "news",
              element: <AdminNews />
            }
          ]
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
          path: "/updates",
          element: <Updates />,
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
