import AdminLayout from "@/layouts/admin";
import AuthLayout from "@/layouts/auth";
import AccountLayout from "@/layouts/account";
import DefaultLayout from "@/layouts/default";
import ChatLayout from "@/layouts/chat";

import CategoriesPage from "@/pages/(admin)/categories";
import ColorsPage from "@/pages/(admin)/colors";
import DashboardPage from "@/pages/(admin)/dashboard";
import OrdersPage from "@/pages/(admin)/orders";
import OrderDetailsPage from "@/pages/(admin)/orders/order-details";
import ProductsPage from "@/pages/(admin)/products";
import AddNewPage from "@/pages/(admin)/products/add";
import CopyPage from "@/pages/(admin)/products/copy";
import UpdatePage from "@/pages/(admin)/products/update";
import SizesPage from "@/pages/(admin)/sizes";
import StylesPage from "@/pages/(admin)/styles";

import ProfilePage from "@/pages/(platform)/account/profile";
import CartPage from "@/pages/(platform)/cart";
import CheckoutPage from "@/pages/(platform)/checkout";
import CheckoutCanceledPage from "@/pages/(platform)/checkout/canceled";
import CheckoutSuccessPage from "@/pages/(platform)/checkout/success";
import FaqPage from "@/pages/(platform)/faqs";
import HomePage from "@/pages/(platform)/home";
import LoginPage from "@/pages/(platform)/login";
import ProductDetailPage from "@/pages/(platform)/product-detail";
import RegisterPage from "@/pages/(platform)/register";
import ShopPage from "@/pages/(platform)/shop";
import { default as OrderClientPage } from "@/pages/(platform)/account/orders";
import { default as OrderDetailClientPage } from "@/pages/(platform)/account/orders/order-details";
import WishlistPage from "@/pages/(platform)/account/wishlist";
import ConversationsPage from "@/pages/(platform)/conversation";

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
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "checkout/success/:orderId",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "checkout/canceled/:orderId",
        element: <CheckoutCanceledPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: "account",
    element: <AccountLayout />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "orders",
        element: <OrderClientPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailClientPage />,
      },
    ],
  },
  {
    path: "conversations",
    element: <ChatLayout />,
    children: [
      {
        path: ":conversationId",
        element: <ConversationsPage />,
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
        path: "orders",
        element: <OrdersPage />,
      },
      { path: "orders/:orderId", element: <OrderDetailsPage /> },
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
