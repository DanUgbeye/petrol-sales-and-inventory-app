"use client";
import userStore from "@/client/modules/user/store/user.store";
import Button from "@/client/presentation/_shared/components/Button";
import { ORDER_STATUS, Order } from "@/global-types/order.types";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface OrdersTableRowProps {
  order: Order;
  onCompleteOrder: (order: Order) => Promise<void>;
  onDelete: (Order: Order) => Promise<void>;
}

function OrdersTableRow(props: OrdersTableRowProps) {
  const { order, onCompleteOrder, onDelete } = props;
  const user = userStore.getUser();
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [completeOrderLoading, setCompleteOrderLoading] = React.useState(false);

  async function handleDelete(order: Order) {
    setDeleteLoading(true);
    await onDelete(order);
    setDeleteLoading(false);
  }

  async function handleCompleteOrder(order: Order) {
    setCompleteOrderLoading(true);
    await onCompleteOrder(order);
    setCompleteOrderLoading(false);
  }

  return user && user.role === USER_ROLES.MANAGER ? (
    <tr
      className={twMerge(" h-20 border-b-2 border-white text-lg font-medium ")}
    >
      <td className=" px-4 text-left ">{order.type}</td>

      <td className=" px-4 text-left ">{order.quantity}</td>

      <td className=" px-4 text-left ">{order.pricePerLitre}</td>

      <td className=" px-4 text-left ">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={
            completeOrderLoading || order.status === ORDER_STATUS.COMPLETED
          }
          loading={completeOrderLoading}
          onClick={() => handleCompleteOrder(order)}
          className={twMerge(
            " border border-black ",
            order.status === ORDER_STATUS.COMPLETED &&
              "bg-green-600 hover:bg-green-600 ",
            order.status === ORDER_STATUS.ONGOING &&
              " bg-amber-400 hover:bg-amber-500"
          )}
        >
          {order.status}
        </Button>
      </td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={deleteLoading || order.status === ORDER_STATUS.COMPLETED}
          loading={deleteLoading}
          onClick={() => handleDelete(order)}
          className={twMerge(
            " border border-black ",
            order.status !== ORDER_STATUS.COMPLETED
              ? " bg-red-600 hover:bg-red-700 "
              : " bg-red-800 text-white/40 hover:bg-red-800 "
          )}
        >
          Delete
        </Button>
      </td>
    </tr>
  ) : null;
}

export default observer(OrdersTableRow);
