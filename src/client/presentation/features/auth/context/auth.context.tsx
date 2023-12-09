"use client";
import React, { PropsWithChildren } from "react";
import { observer } from "mobx-react";
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
      setAuthLoading(false);
      authStorage.save(auth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
