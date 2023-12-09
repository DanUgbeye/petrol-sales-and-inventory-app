"use client";
import apiService from "@/client/modules/api/api";
import { SaleAPIService } from "@/client/modules/sale/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import SalesTable from "@/client/presentation/features/sales/components/SalesTable";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { Sale } from "@/global-types/sale.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import React from "react";

function AllSalesPage() {
  const salesService = new SaleAPIService(apiService);
  const user = userStore.getUser();
  const queryClient = useQueryClient();
  const QUERY_KEY = "ALL_SALES";

  const {
    isLoading: salesLoading,
    data,
    error: recieverError,
  } = useQuery<Sale[], Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => salesService.getAllSale(),
  });

  async function handleDelete(sale: Sale) {
    try {
      await salesService.deleteSale(sale._id);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: `delete-sale-${sale._id}`,
      });
    }

    toast.success("sale deleted");
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  return (
    <Container>
      <section className=" mb-20 rounded-lg bg-white/40 backdrop-blur-sm ">
        <h2 className=" py-6 text-3xl font-bold ">All Sales</h2>

        {salesLoading && (
          <div className=" w-ful grid place-items-center py-12 ">
            <Spinner />
          </div>
        )}

        {!salesLoading && data && data.length > 0 && (
          <div className=" px-8 pb-20 ">
            <SalesTable sales={data} onDelete={handleDelete} />
          </div>
        )}
      </section>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllSalesPage));
