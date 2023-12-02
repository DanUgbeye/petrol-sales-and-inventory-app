"use client";
import React, { PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/client//modules/api/api";
import useAuth from "../../user/hooks/useAuth.hook";
import { Sale } from "@/global-types/sale.types";
import { SaleAPIService } from "@/client/modules/sale/api";

export interface SaleContextProps {
  saleLoading: boolean;
  sales: Sale[];
  loadSale: () => void;
}

export const SaleContext = React.createContext<SaleContextProps>({
  saleLoading: false,
  sales: [],
  loadSale: () => {},
});

export interface SaleContextProviderProps extends PropsWithChildren {}

export function SaleContextProvider(props: SaleContextProviderProps) {
  const { auth, authLoading } = useAuth();
  const [sales, setSales] = React.useState<Sale[]>([]);
  const [saleLoading, setLoading] = React.useState(true);

  const saleApi = new SaleAPIService(apiService);

  const { isLoading, data, error, refetch } = useQuery<Sale[], Error>({
    enabled: auth !== null && !authLoading,
    queryKey: ["GET_ALL_BINS", auth],
    queryFn: () => saleApi.getAllSale(),
    refetchInterval: 60 * 1000,
  });

  /** fetch sale data from API */
  const loadSale = React.useCallback(async () => {
    if (!authLoading && !auth) {
      return;
    }

    setLoading(true);

    const { data, error } = await refetch();
    if (data) {
      setSales(data);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading]);

  /* handle loading state change */
  React.useEffect(() => {
    setLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  /* handle sale state change */
  React.useEffect(() => {
    if (data) {
      setSales(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* delete any saved sale info once auth details is not available */
  React.useEffect(() => {
    if (!auth && !authLoading && sales.length > 0) {
      setSales([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading, sales]);

  return (
    <SaleContext.Provider
      value={{
        saleLoading,
        sales,
        loadSale,
      }}
    >
      {props.children}
    </SaleContext.Provider>
  );
}
