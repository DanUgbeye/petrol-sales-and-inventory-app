"use client";
import apiService from "@/client/modules/api/api";
import { USER_ROLES, UserLoginData } from "@/global-types/user.types";
import Button from "@/client/presentation/_shared/components/Button";
import { Container } from "@/client/presentation/_shared/components/Container";
import Input from "@/client/presentation/_shared/components/Input";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import userStore from "@/client/modules/user/store/user.store";
import authStore from "@/client/modules/auth/store/auth.store";
import { AuthAPIService } from "@/client/modules/auth/api";
import { LocalStorage } from "@/client/global-utils/persistent-storage";
import { AuthStorage, UserStorage } from "@/client/modules/user/storage";

function EmployeeLoginPage() {
  const router = useRouter();

  const initialValues: UserLoginData = {
    email: "",
    password: "",
  };

  async function handleSubmit(data: UserLoginData) {
    const authApi = new AuthAPIService(apiService);
    let res;

    try {
      res = await authApi.login(USER_ROLES.EMPLOYEE, data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    authStore.setAuth(res.auth);
    userStore.setUser(res.user);

    apiService.setToken(res.auth.token);

    const localStorage = new LocalStorage();

    const userStorage = new UserStorage(localStorage);
    userStorage.save(res.user);

    const authStorage = new AuthStorage(localStorage);
    authStorage.save(res.auth);

    router.replace("/dashboard");

    toast.success("LOGIN SUCCESSFUL");
  }

  React.useEffect(() => {
    if (authStore.getAuth()) {
      router.replace("/dashboard");
      toast.success("LOGIN SESSION AVAILABLE", { toastId: "login-session" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className=" h-full min-h-screen ">
      <Container className=" py-16 ">
        <div className=" mx-auto w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
          <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-blue-700 ">
            <h2 className="  ">EMPLOYEE LOGIN</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              await handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <form onSubmit={handleSubmit} className="  w-full ">
                  <fieldset className=" mb-9 flex flex-col gap-y-4 ">
                    <Input
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="email address"
                      error={errors.email || ""}
                      touched={touched.email}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Input
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      error={errors.password || ""}
                      touched={touched.password}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </div>

        <div className=" my-12 ">
          <Link
            href={"/"}
            className=" text-white underline-offset-4 hover:underline "
          >
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default observer(EmployeeLoginPage);
