"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import React from "react";

function AllSalesPage() {
  return (
    <Container>
      <div>All Sales Page</div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllSalesPage));
