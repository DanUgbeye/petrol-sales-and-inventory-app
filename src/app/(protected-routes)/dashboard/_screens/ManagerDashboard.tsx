import numberUtils from "@/client/global-utils/number-utils";
import apiService from "@/client/modules/api/api";
import { InventoryAPIService } from "@/client/modules/inventory/api";
import inventoryUtils from "@/client/modules/inventory/utils/inventory.utils";
import { UserAPIService } from "@/client/modules/user/api";
import userStore from "@/client/modules/user/store/user.store";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import StatsCard from "@/client/presentation/_shared/components/StatsCard";
import useExecuteOnce from "@/client/presentation/_shared/hooks/useExecuteOnce.hook";
import { INVENTORY_LEVEL, Inventory } from "@/global-types/inventory.types";
import { AppSalesStat } from "@/global-types/sale.types";
import { USER_ROLES } from "@/global-types/user.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { twMerge } from "tailwind-merge";

function ManagerDashboard() {
  const userService = new UserAPIService(apiService);
  const user = userStore.getUser();
  const { executeOnce, reset } = useExecuteOnce();
  const QUERY_KEY = "ALL_STATS";

  const {
    isLoading: statsLoading,
    data,
    error,
  } = useQuery<AppSalesStat, Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => userService.getStats(user ? user.role : USER_ROLES.EMPLOYEE),
    refetchInterval: 2000,
  });

  const inventoryService = new InventoryAPIService(apiService);
  const QUERY_KEY_2 = "ALL_INVENTORY";

  const {
    isLoading: inventoryLoading,
    data: inventory,
    error: inventoryError,
  } = useQuery<Inventory[], Error>({
    enabled: user !== null && user.role === USER_ROLES.MANAGER,
    queryKey: [QUERY_KEY_2, user],
    queryFn: () => inventoryService.getAllInventory(),
    refetchInterval: 2000,
  });

  const stats = React.useMemo(() => {
    if (data) {
      let temp = {
        total: {
          amount: numberUtils.formatAmount(data.total.amount),
          quantity: numberUtils.formatAmount(data.total.quantity),
        },
        month: {
          amount: numberUtils.formatAmount(data.month.amount),
          quantity: numberUtils.formatAmount(data.month.quantity),
        },
      };
      return temp;
    }

    return null;
  }, [data]);

  React.useEffect(() => {
    if (inventory) {
      inventory.forEach((singleInventory) => {
        if (singleInventory.quantity < 3_000) {
          setTimeout(() => {
            executeOnce(() => alert(`${singleInventory.type} is low`));
          }, 1500);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventory]);

  React.useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=" w-full space-y-12 ">
        <div className=" flex justify-between gap-x-12 ">
          {statsLoading && (
            <div className=" grid w-full place-items-center py-12 ">
              <Spinner className=" h-10 w-10 text-white " />
            </div>
          )}

          {!statsLoading && stats && (
            <>
              <div className=" flex w-full max-w-lg flex-col gap-y-8 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
                <h2 className=" text-sm font-bold ">TOTAL SALE</h2>
                <div className=" grid w-full  grid-cols-2 justify-between gap-y-8  ">
                  <StatsCard
                    name="Quantity"
                    figure={stats.total.quantity}
                    unit="Litres"
                  />
                  <StatsCard
                    name="Amount"
                    figure={stats.total.amount}
                    unit={"Naira"}
                  />
                </div>
              </div>

              <div className=" flex w-full max-w-lg flex-col gap-y-8 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
                <h2 className=" text-sm font-bold ">MONTH SALE</h2>
                <div className=" grid w-full  grid-cols-2 justify-between gap-y-8  ">
                  <StatsCard
                    name="Quantity"
                    figure={stats.month.quantity}
                    unit="Litres"
                  />
                  <StatsCard
                    name="Amount"
                    figure={stats.month.amount}
                    unit={"Naira"}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className=" flex w-full max-w-xl flex-col gap-y-6 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
          <h2 className=" text-sm font-bold ">INVENTORY LEVELS</h2>

          <div className=" fex-col flex w-full  ">
            {inventoryLoading && (
              <div className=" grid w-full place-items-center py-12 ">
                <Spinner className=" h-10 w-10 text-white " />
              </div>
            )}

            {!inventoryLoading && inventory && (
              <div className=" grid w-full grid-cols-2 gap-y-8 divide-x-2 ">
                <Mapper
                  id="all-inventory"
                  list={inventory}
                  component={({ item: singleInventory, index }) => {
                    const inventoryLevel =
                      inventoryUtils.getInventoryLevel(singleInventory);
                    return (
                      <>
                        <div className=" flex flex-col items-center gap-y-6 px-8 ">
                          <div className=" text-4xl font-light ">
                            {singleInventory.type}
                          </div>

                          <div className=" flex items-end gap-x-2 ">
                            <span
                              className={twMerge(
                                " text-5xl font-bold ",

                                inventoryLevel === INVENTORY_LEVEL.OPTIMAL &&
                                  " text-green-500 ",
                                inventoryLevel === INVENTORY_LEVEL.OK &&
                                  " text-amber-500",
                                inventoryLevel === INVENTORY_LEVEL.LOW &&
                                  " text-red-500 "
                              )}
                            >
                              {singleInventory.quantity}
                            </span>
                            <span className=" text-sm font-light tracking-widest ">
                              Litres
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;
