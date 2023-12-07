"use client";
import authStore from "@/client/modules/auth/store/auth.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import React from "react";

function CreateOrderPage() {
  const auth = authStore.getAuth();

  return (
    <Container>
      <div>Create Order Page</div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(CreateOrderPage));
