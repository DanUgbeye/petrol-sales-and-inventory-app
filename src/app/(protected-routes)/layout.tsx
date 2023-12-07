"use client";
import ProtectedRoute from "@/client/presentation/layouts/protected-route/ProtectedRoute";
import { observer } from "mobx-react";
import React, { Fragment } from "react";


export interface ProtectedRouteLayoutProps extends React.PropsWithChildren {}

function ProtectedRouteLayout(props: ProtectedRouteLayoutProps) {
  const { children } = props;


  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default observer(ProtectedRouteLayout);
