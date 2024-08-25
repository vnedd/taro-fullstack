import AdminLayout from "@/layouts/admin";
import AuthLayout from "@/layouts/auth";
import DefaultLayout from "@/layouts/default";
import CategoriesPage from "@/pages/admin/categories";
import DashboardPage from "@/pages/admin/dashboard";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/not-found";
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
      {
        path: "categories",
        element: <CategoriesPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
