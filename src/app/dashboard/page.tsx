"use client";
import { Container } from "@/client/presentation/_shared/components/Container";
import Mapper from "@/client/presentation/_shared/components/Mapper";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import StatsCard from "@/client/presentation/_shared/components/StatsCard";
import useUser from "@/client/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/client/presentation/layouts/protected-route/WithProtectedRoute";
import { USER_ROLES } from "@/global-types/user.types";
import { observer } from "mobx-react";
import React from "react";

function DashboardPage() {
  const { user } = useUser();

  return user ? (
    <main className="h-full min-h-full text-white ">
      <Container>
        {user.role === USER_ROLES.MANAGER && (
          <>
            {true && (
              <div className=" grid w-full place-items-center ">
                <Spinner className=" h-10 w-10 text-white " />{" "}
              </div>
            )}

            {!true && (
              <div className=" w-full ">
                <div className=" grid w-full grid-cols-2 justify-between gap-y-8 py-12 md:grid-cols-4 ">
                  <StatsCard name="Bins" figure={4} />
                  <StatsCard name="Disposals" figure={14} />
                  <StatsCard name="Completed" figure={10} />
                  <StatsCard name="Ongoing" figure={4} />
                </div>

                <div className=" my-12 ">
                  <div className=" mb-8 text-3xl ">BINS</div>

                  <div className=" grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-8 ">
                    <Mapper
                      id="all-bins"
                      list={[]}
                      component={({ item }) => <></>}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {user.role === USER_ROLES.EMPLOYEE && <></>}
      </Container>
    </main>
  ) : null;
}

export default observer(
  WithOnProtectedRoute(
    WithPrimaryLayout(DashboardPage, {
      className:
        "  ",
    })
  )
);
