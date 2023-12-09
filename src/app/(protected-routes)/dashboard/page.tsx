"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import useUser from "@/client/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";
import React from "react";
import EmployeeDashboard from "./_screens/EmployeeDashboard";
import ManagerDashboard from "./_screens/ManagerDashboard";

function DashboardPage() {
  const { user } = useUser();

  return user ? (
    <main className="h-full min-h-full text-white ">
      <Container className=" pb-20 ">
        {user.role === USER_ROLES.MANAGER && <ManagerDashboard />}
        {user.role === USER_ROLES.EMPLOYEE && <EmployeeDashboard />}
      </Container>
    </main>
  ) : null;
}

export default observer(WithPrimaryLayout(DashboardPage));
