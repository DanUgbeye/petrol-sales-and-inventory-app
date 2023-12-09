"use client";
import React from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { LocalStorage } from "@/client/global-utils/persistent-storage";
import apiService from "@/client/modules/api/api";
import authStore from "@/client/modules/auth/store/auth.store";
import { AuthStorage, UserStorage } from "@/client/modules/user/storage";
import userStore from "@/client/modules/user/store/user.store";

// CSS FILES
import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { UserContextProvider } from "@/client/presentation/features/user/context";
import { AuthContextProvider } from "@/client/presentation/features/auth/context";

function initialize() {
  const userStorage = new UserStorage(new LocalStorage());
  const savedUser = userStorage.get();

  userStore.setUser(savedUser);

  const authStorage = new AuthStorage(new LocalStorage());
  const savedAuth = authStorage.get();

  authStore.setAuth(savedAuth);
  apiService.setToken(savedAuth?.token || "");
}

initialize();

const queryClient = new QueryClient();

export interface RootLayoutProps extends React.PropsWithChildren {}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <html
      lang="en"
      style={{
        backgroundImage: `url('../petrol-station.jpg')`,
      }}
      className=" bg-cover bg-no-repeat "
    >
      <Head>
        <title>Sales and Inventory App</title>
        <meta name="description" content="Sales & Inventory app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <body className={" min-h-screen bg-black/40 "}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <UserContextProvider>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                newestOnTop={false}
                theme="colored"
                hideProgressBar
              />

              {children}
            </UserContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
