"use client";
import apiService from "@/client/modules/api/api";
import { SaleAPIService } from "@/client/modules/sale/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { Sale } from "@/global-types/sale.types";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import React from "react";

function AllSalesPage() {
  const salesService = new SaleAPIService(apiService);
  const user = userStore.getUser();

  const {
    isLoading: salesLoading,
    data,
    error: recieverError,
  } = useQuery<Sale[], Error>({
    enabled: user !== null,
    queryKey: ["ALL_SALES", user],
    queryFn: () => salesService.getAllSale(),
  });

  return (
    <Container>
      <div>All Sales Page</div>

      {salesLoading && (
        <div className=" w-ful grid place-items-center ">
          <Spinner />
        </div>
      )}

      {!salesLoading && data && data.length > 1 && (
        <>
          <div className=" rounded-lg bg-white/30 backdrop-blur-sm  ">
            <div className="  grid h-16 grid-cols-4 items-center font-bold text-lg ">
              <span className="  ">Inventory Type</span>
              <span className="  ">Quantity</span>
              <span className="  ">Prie per litre</span>
              <span className="  "> Date</span>
            </div>

            <Mapper
              id="all-sales"
              list={data}
              component={({ item: sale, index }) => (
                <>
                  <div className="  grid h-12 grid-cols-4 items-center   ">
                    <span className="  ">{sale.inventoryType}</span>
                    <span className="  ">{sale.quantity}</span>
                    <span className="  ">{sale.pricePerLitre}</span>
                    <span className="  ">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            />
          </div>
        </>
      )}
    </Container>
  );
}

export default observer(WithPrimaryLayout(AllSalesPage));
