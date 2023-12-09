"use client";
import userStore from "@/client/modules/user/store/user.store";
import Button from "@/client/presentation/_shared/components/Button";
import { USER_ROLES, User } from "@/global-types/user.types";
import { observer } from "mobx-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface EmployeesTableRowProps {
  employee: User;
  onDelete: (Employee: User) => Promise<void>;
}

function EmployeesTableRow(props: EmployeesTableRowProps) {
  const { employee, onDelete } = props;
  const user = userStore.getUser();
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  async function handleDelete(employee: User) {
    setDeleteLoading(true);
    await onDelete(employee);
    setDeleteLoading(false);
  }

  return user && user.role === USER_ROLES.MANAGER ? (
    <tr
      className={twMerge(" h-20 border-b-2 border-white text-lg font-medium ")}
    >
      <td className=" px-4 text-left ">{employee.name}</td>
      <td className=" px-4 text-left ">{employee.email}</td>
      <td className=" px-4 text-left ">{employee.sex}</td>
      <td className=" px-4 text-left ">{employee.phoneNumber}</td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={deleteLoading}
          loading={deleteLoading}
          onClick={() => handleDelete(employee)}
          className=" border border-black bg-red-600 hover:bg-red-700 "
        >
          Delete
        </Button>
      </td>
    </tr>
  ) : null;
}

export default observer(EmployeesTableRow);
