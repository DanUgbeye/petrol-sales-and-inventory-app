"use client";
import authStore from "@/client/modules/auth/store/auth.store";
import useAuth from "@/client/presentation/features/user/hooks/useAuth.hook";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/client/presentation/layouts/protected-route/WithProtectedRoute";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

function CreateOrderPage() {
  const auth = authStore.getAuth();

  return <div>Create Order Page</div>;
}

export default observer(WithPrimaryLayout(CreateOrderPage));
