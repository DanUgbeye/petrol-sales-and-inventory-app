"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import React from "react";

function AllOrdersPage() {
  return (
    <Container>
      <div>All Orders Page</div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllOrdersPage));
