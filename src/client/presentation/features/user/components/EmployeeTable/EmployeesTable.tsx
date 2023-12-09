"use client";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import { User } from "@/global-types/user.types";
import React from "react";
import EmployeesTableRow from "./EmployeesTableRow";
import userStore from "@/client/modules/user/store/user.store";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";

export interface EmployeesTableProps {
  employees: User[];
  onDelete: (sale: User) => Promise<any>;
}

function EmployeesTable(props: EmployeesTableProps) {
  const { employees, onDelete } = props;
  const user = userStore.getUser();

  return user && user.role === USER_ROLES.MANAGER ? (
    <table className=" w-full ">
      <thead className=" mx-12 h-20 w-full border-b-2 border-white text-lg font-bold ">
        <th className=" px-4 text-left ">Full name</th>
        <th className=" px-4 text-left ">Email</th>
        <th className=" px-4 text-left ">Sex</th>
        <th className=" px-4 text-left "> Phone Number</th>
        <th className=" px-4 text-left "></th>
      </thead>

      <tbody className=" w-full px-12 ">
        <Mapper
          id="all-employees-data"
          list={employees}
          component={({ item: employee, index }) => (
            <EmployeesTableRow employee={employee} onDelete={onDelete} />
          )}
        />
      </tbody>
    </table>
  ) : null;
}

export default observer(EmployeesTable);
