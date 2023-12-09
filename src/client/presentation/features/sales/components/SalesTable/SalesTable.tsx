"use client";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import { Sale } from "@/global-types/sale.types";
import React from "react";
import SalesTableRow from "./SalesTableRow";
import userStore from "@/client/modules/user/store/user.store";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";

export interface SalesTableProps {
  sales: Sale[];
  onDelete: (sale: Sale) => Promise<any>;
}

function SalesTable(props: SalesTableProps) {
  const { sales, onDelete } = props;
  const user = userStore.getUser();

  return user ? (
    <table className=" w-full ">
      <thead className=" mx-12 h-20 w-full border-b-2 border-white text-lg font-bold ">
        <th className=" px-4 text-left ">Inventory Type</th>
        <th className=" px-4 text-left ">Quantity</th>
        <th className=" px-4 text-left ">Price per litre</th>
        <th className=" px-4 text-left "> Date</th>
        {user.role === USER_ROLES.EMPLOYEE && (
          <th className=" px-4 text-left "></th>
        )}
      </thead>

      <tbody className=" w-full px-12 ">
        <Mapper
          id="all-sales-data"
          list={sales}
          component={({ item: sale, index }) => (
            <SalesTableRow sale={sale} onDelete={onDelete} />
          )}
        />
      </tbody>
    </table>
  ) : null;
}

export default observer(SalesTable);
