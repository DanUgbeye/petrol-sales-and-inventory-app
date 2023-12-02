"use client";
import React, { PropsWithChildren } from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import apiService from "@/client/modules/api/api";
import { AuthStorage } from "@/client/modules/user/storage";
import { LocalStorage } from "@/client/global-utils/persistent-storage";
import { AuthData } from "@/global-types/auth.types";
import authStore from "@/client/modules/auth/store/auth.store";

export interface AuthContextProps {
  authLoading: boolean;
  auth: AuthData | null;
}

export const AuthContext = React.createContext<AuthContextProps>({
  authLoading: false,
  auth: null,
});

export interface AuthContextProviderProps extends PropsWithChildren {}

export const AuthContextProvider = observer(
  (props: AuthContextProviderProps) => {
    const auth = authStore.getAuth();
    const authStorage = new AuthStorage(new LocalStorage());

    const [authLoading, setAuthLoading] = React.useState(true);

    React.useEffect(() => {
      setAuthLoading(true);
      authStore.setAuth(authStorage.get());
      setAuthLoading(false);
    }, []);

    React.useEffect(() => {
      authStorage.save(auth);
    }, [auth]);

    return (
      <AuthContext.Provider
        value={{
          authLoading,
          auth,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }
);
