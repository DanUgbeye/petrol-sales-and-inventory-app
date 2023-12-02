"use client";
import React from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

// CSS FILES
import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AuthContextProvider,
  UserContextProvider,
} from "@/client/presentation/features/user/context";
import Image from "next/image";

const queryClient = new QueryClient();

export interface RootLayoutProps extends React.PropsWithChildren {}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html
      lang="en"
      style={{
        backgroundImage: `url('../petrol-station.jpg')`,
      }}
      className=" bg-cover bg-no-repeat "
    >
      <Head>
        <title>WDIS</title>
        <meta name="description" content="Sales & Inventory app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <body className={" bg-black/40 "}>
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
