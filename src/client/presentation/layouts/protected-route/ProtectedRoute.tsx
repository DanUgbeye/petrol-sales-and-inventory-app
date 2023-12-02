"use client";
import { useRouter } from "next/navigation";
import React from "react";
import useUser from "../../features/user/hooks/useUser.hook";
import useAuth from "../../features/user/hooks/useAuth.hook";
import useExecuteOnce from "@/client/presentation/_shared/hooks/useExecuteOnce.hook";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import { toast } from "react-toastify";
import { Container } from "@/client/presentation/_shared/components/Container";

export interface ProtectedRouteProps extends React.PropsWithChildren {}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { userLoading, user } = useUser();
  const { authLoading, auth } = useAuth();
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
