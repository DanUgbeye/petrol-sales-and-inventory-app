"use client";
import userStore from "@/client/modules/user/store/user.store";
import Button from "@/client/presentation/_shared/components/Button";
import { Sale } from "@/global-types/sale.types";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface SalesTableRowProps {
  sale: Sale;
  onDelete: (Sale: Sale) => Promise<void>;
}

function SalesTableRow(props: SalesTableRowProps) {
  const { sale, onDelete } = props;
  const user = userStore.getUser();
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  async function handleDelete(sale: Sale) {
    setDeleteLoading(true);
    await onDelete(sale);
    setDeleteLoading(false);
  }

  return user ? (
    <tr
      className={twMerge(" h-20 border-b-2 border-white text-lg font-medium ")}
    >
      <td className=" px-4 text-left ">{sale.inventoryType}</td>
      <td className=" px-4 text-left ">{sale.quantity}</td>
      <td className=" px-4 text-left ">{sale.pricePerLitre}</td>
      <td className=" px-4 text-left ">
        {new Date(sale.createdAt).toLocaleDateString()}
      </td>
      {user.role === USER_ROLES.EMPLOYEE && (
        <td className=" px-4 text-left ">
          <Button
            type="button"
            disabled={deleteLoading}
            loading={deleteLoading}
            onClick={() => handleDelete(sale)}
            className=" border border-black bg-red-600 hover:bg-red-700 "
          >
            Delete
          </Button>
        </td>
      )}
    </tr>
  ) : null;
}

export default observer(SalesTableRow);
