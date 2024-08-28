import AdminLayout from "@/layouts/admin";
import AuthLayout from "@/layouts/auth";
import DefaultLayout from "@/layouts/default";

import CategoriesPage from "@/pages/(admin)/categories";
import ColorsPage from "@/pages/(admin)/colors";
import DashboardPage from "@/pages/(admin)/dashboard";
import ProductsPage from "@/pages/(admin)/products";
import AddNewPage from "@/pages/(admin)/products/add";
import CopyPage from "@/pages/(admin)/products/copy";
import UpdatePage from "@/pages/(admin)/products/update";
import SizesPage from "@/pages/(admin)/sizes";
import StylesPage from "@/pages/(admin)/styles";

import HomePage from "@/pages/(platform)/home";
import LoginPage from "@/pages/(platform)/login";
import RegisterPage from "@/pages/(platform)/register";

import NotFound from "@/pages/not-found";

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
      {
        path: "styles",
        element: <StylesPage />,
      },
      {
        path: "sizes",
        element: <SizesPage />,
      },
      {
        path: "colors",
        element: <ColorsPage />,
      },
      {
        path: "products",
        children: [
          { path: "", element: <ProductsPage /> },
          { path: "add", element: <AddNewPage /> },
          { path: "update/:id", element: <UpdatePage /> },
          { path: "copy/:id", element: <CopyPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
