"use client";
import apiService from "@/client/modules/api/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { Inventory } from "@/global-types/inventory.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";
import { USER_ROLES } from "@/global-types/user.types";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import { InventoryAPIService } from "@/client/modules/inventory/api";
import InventoryTable from "@/client/presentation/features/inventory/components/InventoryTable";

function AllInventoryPage() {
  const inventoryService = new InventoryAPIService(apiService);
  const user = userStore.getUser();
  const queryClient = useQueryClient();
  const QUERY_KEY = "ALL_INVENTORY";

  const {
    isLoading: inventoryLoading,
    data,
    error: recieverError,
  } = useQuery<Inventory[], Error>({
    enabled: user !== null && user.role === USER_ROLES.MANAGER,
    queryKey: [QUERY_KEY, user],
    queryFn: () => inventoryService.getAllInventory(),
    refetchInterval: 2000,
  });

  async function handleDelete(inventory: Inventory) {
    try {
      await inventoryService.deleteInventory(inventory._id);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: `delete-inventory-${inventory._id}`,
      });
    }

    toast.success("inventory deleted", {
      toastId: `delete-inventory-${inventory._id}`,
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  return (
    <Container>
      <section className=" mb-20 rounded-lg bg-white/30 px-8 backdrop-blur-sm ">
        <div className=" flex w-full items-center ">
          <h2 className=" w-full py-6 text-3xl font-bold ">All Inventory</h2>

          <Link
            className=" grid h-12 w-fit min-w-fit place-items-center rounded-md bg-blue-600 px-3 transition-all duration-300 hover:bg-blue-800 "
            href={"/inventory/create"}
          >
            Add New Inventory
          </Link>
        </div>

        {inventoryLoading && (
          <div className=" w-ful grid place-items-center py-12 ">
            <Spinner />
          </div>
        )}

        {!inventoryLoading && data && data.length > 0 && (
          <div className=" overflow-x-auto pb-20 ">
            <InventoryTable inventory={data} onDelete={handleDelete} />
          </div>
        )}
      </section>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllInventoryPage));
