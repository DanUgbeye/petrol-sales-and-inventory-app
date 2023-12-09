"use client";
import { UserAPIService } from "@/client/modules/user/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { User } from "@/global-types/user.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";
import apiService from "@/client/modules/api/api";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import EmployeesTable from "@/client/presentation/features/user/components/EmployeeTable/EmployeesTable";

function AllEmployeesPage() {
  const userService = new UserAPIService(apiService);
  const user = userStore.getUser();
  const queryClient = useQueryClient();
  const QUERY_KEY = "ALL_EMPLOYEES";

  const {
    isLoading: employeesLoading,
    data,
    error: recieverError,
  } = useQuery<User[], Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => userService.getAllEmployees(),
  });

  async function handleDelete(employee: User) {
    try {
      await userService.deleteEmployee(employee._id);
    } catch (error: any) {
      toast.error(error.message, {
        toastId: `delete-employee-${employee._id}`,
      });
    }

    toast.success("employee deleted", {
      toastId: `delete-employee-${employee._id}`,
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  return (
    <Container>
      <section className=" mb-20 rounded-lg bg-white/40 px-8 backdrop-blur-sm ">
        <div className=" flex w-full items-center ">
          <h2 className=" w-full py-6 text-3xl font-bold ">All Employees</h2>

          <Link
            className=" grid h-12 w-fit min-w-fit place-items-center rounded-md bg-blue-600 px-3 transition-all duration-300 hover:bg-blue-800 "
            href={"/employee/register"}
          >
            Register Employee
          </Link>
        </div>

        {employeesLoading && (
          <div className=" w-ful grid place-items-center py-12 ">
            <Spinner />
          </div>
        )}

        {!employeesLoading && data && data.length > 0 && (
          <div className=" pb-20 ">
            <EmployeesTable employees={data} onDelete={handleDelete} />
          </div>
        )}
      </section>
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllEmployeesPage));
