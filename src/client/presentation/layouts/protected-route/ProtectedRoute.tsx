"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useUser from "../../features/user/hooks/useUser.hook";
import useAuth from "../../features/user/hooks/useAuth.hook";
import useExecuteOnce from "@/client/presentation/_shared/hooks/useExecuteOnce.hook";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import { toast } from "react-toastify";
import { Container } from "@/client/presentation/_shared/components/Container";
import { observer } from "mobx-react";
import userStore from "@/client/modules/user/store/user.store";
import authStore from "@/client/modules/auth/store/auth.store";

export interface ProtectedRouteProps extends React.PropsWithChildren {}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { userLoading } = useUser();
  const { authLoading } = useAuth();

  const user = userStore.getUser();
  const auth = authStore.getAuth();

  const router = useRouter();
  const { executeOnce, reset } = useExecuteOnce();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (authLoading || userLoading) {
      setIsAuthenticated(false);
    }

    if (!authLoading && !userLoading) {
      if (!auth) {
        executeOnce(() => {
          toast.info("LOGIN TO CONTINUE");
          router.replace("/");
        });
      } else {
        setIsAuthenticated(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading, user, userLoading]);

  React.useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return !userLoading && !authLoading && isAuthenticated ? (
    <>{props.children}</>
  ) : (
    <Container className=" grid h-[70vh] w-full place-items-center ">
      <Spinner className=" aspect-square h-6 w-6 text-violet-800 " />
    </Container>
  );
}

export default observer(ProtectedRoute);
