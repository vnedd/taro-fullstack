import AdminLayout from "@/layouts/admin";
import AuthLayout from "@/layouts/auth";
import DefaultLayout from "@/layouts/default";
import DashboardPage from "@/pages/admin/dashboard";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

export const routerConfig = [
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
    ],
  },
];
