"use client";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/global-types/user.types";
import { UserAPIService } from "@/client/modules/user/api";
import apiService from "@/client/modules/api/api";
import { UserStorage } from "@/client/modules/user/storage";
import { LocalStorage } from "@/client/global-utils/persistent-storage";
import useAuth from "../hooks/useAuth.hook";
import userStore from "@/client/modules/user/store/user.store";
import authStore from "@/client/modules/auth/store/auth.store";
import { observer } from "mobx-react";

export interface UserContextProps {
  userLoading: boolean;
  user: User | null;
}

export const UserContext = React.createContext<UserContextProps>({
  userLoading: false,
  user: null,
});

export interface UserContextProviderProps extends PropsWithChildren {}

export const UserContextProvider = observer(
  (props: UserContextProviderProps) => {
    const { authLoading } = useAuth();
    const user = userStore.getUser();
    const [userLoading, setLoading] = React.useState(true);
    const userStorage = new UserStorage(new LocalStorage());
    const userApi = new UserAPIService(apiService);
    const auth = authStore.getAuth();

    function initializeUser() {
      setLoading(true);
      userStore.setUser(userStorage.get());
      setLoading(false);
    }

    /** fetch user data from API */
    async function fetchUser() {
      if (!auth || authLoading) return;

      try {
        console.log("fetching");
        const res = await userApi.getProfile(auth.role);
        userStore.setUser(res);
      } catch (error: any) {
        console.log(apiService.getToken());
        console.log(error);
      }
    }

    React.useEffect(() => {
      initializeUser();
      fetchUser();
    }, []);

    React.useEffect(() => {
      userStorage.save(user);
    }, [user]);

    /* delete any saved user info once auth details is not available */
    React.useEffect(() => {
      if (!auth && !authLoading) {
        userStore.setUser(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, authLoading]);

    return (
      <UserContext.Provider
        value={{
          userLoading,
          user,
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
  }
);
