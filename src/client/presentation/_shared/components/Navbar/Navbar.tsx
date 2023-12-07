import { Container } from "@/client/presentation/_shared/components/Container";
import React from "react";
import NavLink from "./NavLink";
import Button from "@/client/presentation/_shared/components/Button";
import { USER_ROLES } from "@/global-types/user.types";
import authStore from "@/client/modules/auth/store/auth.store";
import { observer } from "mobx-react";
import userStore from "@/client/modules/user/store/user.store";

function Navbar() {
  const auth = authStore.getAuth()
  const user = userStore.getUser();

  function handleLogout() {
    authStore.setAuth(null);
  }

  return (
    <nav className=" flex h-28 items-center text-white ">
      <Container className=" h-fit ">
        <div className=" flex h-16 justify-end gap-x-12 gap-y-4 rounded-xl bg-white/20 px-3 backdrop-blur-md sm:flex-row sm:px-8 ">
          {user && (
            <div className=" mx-auto flex w-fit items-center gap-x-7 sm:mx-0 ">
              <NavLink href={"/dashboard"} className=" ">
                Dashboard
              </NavLink>

              {user.role === USER_ROLES.MANAGER && (
                <>
                  <NavLink href={"/employee"} className=" ">
                    Employees
                  </NavLink>

                  <NavLink href={"/inventory"} className=" ">
                    Inventory
                  </NavLink>

                  <NavLink href={"/sales"} className=" ">
                    Sales
                  </NavLink>

                  <NavLink href={"/orders"} className=" ">
                    Orders
                  </NavLink>
                </>
              )}

              {user.role === USER_ROLES.EMPLOYEE && (
                <>
                  <NavLink href={"/sales"} className=" ">
                    Sales
                  </NavLink>
                </>
              )}

              <Button
                onClick={() => handleLogout()}
                className=" w-fit bg-transparent hover:bg-transparent hover:underline hover:underline-offset-4 "
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default observer(Navbar);
