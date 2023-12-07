"use client";
import authStore from "@/client/modules/auth/store/auth.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

function CreateInventoryPage() {
  const auth = authStore.getAuth();

  return (
    <Container>
      <div>Create Inventory Page</div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(CreateInventoryPage));
