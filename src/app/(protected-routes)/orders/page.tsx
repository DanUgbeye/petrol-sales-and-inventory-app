"use client";
import apiService from "@/client/modules/api/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import OrdersTable from "@/client/presentation/features/orders/components/OrdersTable";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { Order } from "@/global-types/order.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";
import { OrderAPIService } from "@/client/modules/order/api/";

function AllOrdersPage() {
  const ordersService = new OrderAPIService(apiService);
  const user = userStore.getUser();
  const queryClient = useQueryClient();
  const QUERY_KEY = "ALL_ORDERS";

  const {
    isLoading: ordersLoading,
    data,
    error: recieverError,
  } = useQuery<Order[], Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => ordersService.getAllOrders(),
  });

  async function handleCompleteOrder(order: Order) {
    try {
      await ordersService.completeOrderStatus(order._id);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: `complete-order-${order._id}`,
      });
    }

    toast.success("order completed", {
      toastId: `complete-order-${order._id}`,
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  async function handleDelete(order: Order) {
    try {
      await ordersService.deleteOrder(order._id);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: `delete-order-${order._id}`,
      });
    }

    toast.success("order deleted", { toastId: `delete-order-${order._id}` });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  return (
    <Container>
      <section className=" mb-20 rounded-lg bg-white/40 backdrop-blur-sm ">
        <div className=" flex w-full items-center px-12 py-6 ">
          <h2 className=" w-full py-4 text-3xl font-bold ">All Orders</h2>

          <Link
            className=" grid h-12 w-fit min-w-fit place-items-center rounded-md bg-blue-600 px-3 transition-all duration-300 hover:bg-blue-800 "
            href={"/orders/create"}
          >
            Create Order
          </Link>
        </div>

        {ordersLoading && (
          <div className=" w-ful grid place-items-center py-12 ">
            <Spinner />
          </div>
        )}

        {!ordersLoading && data && data.length > 0 && (
          <div className=" px-8 pb-20 ">
            <OrdersTable
              orders={data}
              onDelete={handleDelete}
              onCompleteOrder={handleCompleteOrder}
            />
          </div>
        )}
      </section>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllOrdersPage));
