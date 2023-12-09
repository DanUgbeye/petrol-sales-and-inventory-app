"use client";
import userStore from "@/client/modules/user/store/user.store";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import { Inventory } from "@/global-types/inventory.types";
import { USER_ROLES } from "@/global-types/user.types";
import React from "react";
import InventoryTableRow from "./InventoryTableRow";
import { observer } from "mobx-react";

export interface InventoryTableProps {
  inventory: Inventory[];
  onDelete: (inventory: Inventory) => Promise<any>;
}

function InventoryTable(props: InventoryTableProps) {
  const { inventory, onDelete } = props;
  const user = userStore.getUser();

  return user && user.role === USER_ROLES.MANAGER ? (
    <table className=" w-full min-w-[70rem] ">
      <thead className=" mx-12 h-20 w-full border-b-2 border-white text-lg font-semibold ">
        <th className=" px-4 text-left ">Inventory Type</th>
        <th className=" px-4 text-left ">Quantity</th>
        <th className=" px-4 text-left ">Price per litre</th>
        <th className=" px-4 text-left "> Date</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Level</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left "></th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left "></th>
      </thead>

      <tbody className=" w-full px-12 ">
        <Mapper
          id="all-inventory-data"
          list={inventory}
          component={({ item: inventory, index }) => (
            <InventoryTableRow inventory={inventory} onDelete={onDelete} />
          )}
        />
      </tbody>
    </table>
  ) : null;
}

export default observer(InventoryTable);
