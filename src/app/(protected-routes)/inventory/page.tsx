"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { observer } from "mobx-react";
import Link from "next/link";
import React from "react";

function AllInventoryPage() {
  return (
    <Container>
      <div className=" flex  ">
        <div className=" w-full ">All Inventory Page</div>

        <Link
          className=" w-fit min-w-fit rounded-md bg-blue-600 px-3 py-2 transition-all duration-300 hover:bg-blue-800 "
          href={"/inventory/create"}
        >
          Create Inventory
        </Link>
      </div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllInventoryPage));
