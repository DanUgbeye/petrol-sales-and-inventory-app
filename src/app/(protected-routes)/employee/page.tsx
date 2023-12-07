"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import React from "react";

function AllEmployeesPage() {
  return (
    <Container>
      <div>All Employees Page</div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllEmployeesPage));
