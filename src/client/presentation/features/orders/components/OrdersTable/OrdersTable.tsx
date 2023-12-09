"use client";
import userStore from "@/client/modules/user/store/user.store";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import { Order } from "@/global-types/order.types";
import { USER_ROLES } from "@/global-types/user.types";
import React from "react";
import OrdersTableRow from "./OrdersTableRow";
import { observer } from "mobx-react";

export interface OrdersTableProps {
  orders: Order[];
  onCompleteOrder: (order: Order) => Promise<any>;
  onDelete: (order: Order) => Promise<any>;
}

function OrdersTable(props: OrdersTableProps) {
  const { orders, onCompleteOrder, onDelete } = props;
  const user = userStore.getUser();

  return user && user.role === USER_ROLES.MANAGER ? (
    <table className=" w-full ">
      <thead className=" mx-12 h-20 w-full border-b-2 border-white text-lg font-bold ">
        <th className=" px-4 text-left ">Inventory Type</th>
        <th className=" px-4 text-left ">Quantity</th>
        <th className=" px-4 text-left ">Price per litre</th>
        <th className=" px-4 text-left "> Date</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Status</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Action</th>
      </thead>

      <tbody className=" w-full px-12 ">
        <Mapper
          id="all-orders-data"
          list={orders}
          component={({ item: order, index }) => (
            <OrdersTableRow
              order={order}
              onDelete={onDelete}
              onCompleteOrder={onCompleteOrder}
            />
          )}
        />
      </tbody>
    </table>
  ) : null;
}

export default observer(OrdersTable);
