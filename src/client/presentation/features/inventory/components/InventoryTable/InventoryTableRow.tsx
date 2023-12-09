"use client";
import userStore from "@/client/modules/user/store/user.store";
import Button from "@/client/presentation/_shared/components/Button";
import {
  INVENTORY_LEVEL,
  Inventory,
  InventoryLevel,
} from "@/global-types/inventory.types";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { TbArrowWaveRightUp } from "react-icons/tb";
import inventoryUtils from "@/client/modules/inventory/utils/inventory.utils";

export interface InventorysTableRowProps {
  inventory: Inventory;
  onDelete: (Inventory: Inventory) => Promise<void>;
}

function InventorysTableRow(props: InventorysTableRowProps) {
  const { inventory, onDelete } = props;
  const user = userStore.getUser();
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  React.useState(false);

  async function handleDelete(inventory: Inventory) {
    setDeleteLoading(true);
    await onDelete(inventory);
    setDeleteLoading(false);
  }

  const inventoryLevel = React.useMemo(
    () => inventoryUtils.getInventoryLevel(inventory),
    [inventory]
  );

  return user && user.role === USER_ROLES.MANAGER ? (
    <tr
      className={twMerge(" h-20 border-b-2 border-white text-lg font-medium ")}
    >
      <td className=" px-4 text-left text-2xl ">{inventory.type}</td>

      <td className=" px-4 text-left text-4xl font-semibold ">
        <div className=" flex items-end gap-x-2 ">
          <span
            className={twMerge(
              " text-5xl font-bold ",
              inventoryLevel === INVENTORY_LEVEL.OPTIMAL && "text-green-400 ",
              inventoryLevel === INVENTORY_LEVEL.OK && "text-amber-300 ",
              inventoryLevel === INVENTORY_LEVEL.LOW && "text-red-400 "
            )}
          >
            {" "}
            {inventory.quantity}
          </span>
          <span className=" text-sm font-light ">Litres</span>
        </div>
      </td>

      <td className=" px-4 text-left text-2xl ">{inventory.pricePerLitre}</td>

      <td className=" px-4 text-left ">
        {new Date(inventory.createdAt).toLocaleDateString()}
      </td>

      <td
        className={twMerge(
          " px-4 text-left ",
          inventoryLevel === INVENTORY_LEVEL.OPTIMAL &&
            "bg-green-400/20 text-green-500 ",
          inventoryLevel === INVENTORY_LEVEL.OK &&
            "bg-amber-200/20 text-amber-500",
          inventoryLevel === INVENTORY_LEVEL.LOW &&
            "bg-red-100/50 text-red-500 "
        )}
      >
        <div className=" mx-auto flex w-fit items-center gap-3 text-lg ">
          {inventoryLevel}

          {inventoryLevel === INVENTORY_LEVEL.OPTIMAL && (
            <FiTrendingUp className={" h-6 w-6 "} />
          )}

          {inventoryLevel === INVENTORY_LEVEL.OK && (
            <TbArrowWaveRightUp className={" h-6 w-6 "} />
          )}

          {inventoryLevel === INVENTORY_LEVEL.LOW && (
            <FiTrendingDown className={" h-6 w-6 "} />
          )}
        </div>
      </td>

      <td className=" px-4 text-left ">
        <Link
          href={"/orders/create"}
          className={twMerge(
            " rounded-lg border border-black px-3 py-4 font-semibold text-white duration-300 ",
            inventoryLevel === INVENTORY_LEVEL.OPTIMAL &&
              "bg-green-600 hover:bg-green-700 ",
            inventoryLevel === INVENTORY_LEVEL.OK &&
              "bg-amber-500 hover:bg-amber-600 ",
            inventoryLevel === INVENTORY_LEVEL.LOW &&
              "bg-red-500 hover:bg-red-600 "
          )}
        >
          Make Order
        </Link>
      </td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={deleteLoading}
          loading={deleteLoading}
          onClick={() => handleDelete(inventory)}
          className={twMerge(
            " border border-black bg-red-600 hover:bg-red-700 "
          )}
        >
          Delete
        </Button>
      </td>
    </tr>
  ) : null;
}

export default observer(InventorysTableRow);
