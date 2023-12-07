"use client";
import React from "react";
import Button from "@/client/presentation/_shared/components/Button";
import { Container } from "@/client/presentation/_shared/components/Container";
import Input from "@/client/presentation/_shared/components/Input";
import Select from "@/client/presentation/_shared/components/Select";
import { Formik } from "formik";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuth from "@/client/presentation/features/user/hooks/useAuth.hook";
import useUser from "@/client/presentation/features/user/hooks/useUser.hook";
import { observer } from "mobx-react";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { AuthAPIService } from "@/client/modules/auth/api";
import apiService from "@/client/modules/api/api";
import { NewEmployeeData } from "@/global-types/user.types";

function RegisterEmployeePage() {
  const router = useRouter();
  const { auth } = useAuth();
  const {} = useUser();

  const initialValues: NewEmployeeData = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    sex: "",
  };

  async function handleSubmit(values: NewEmployeeData) {
    const authService = new AuthAPIService(apiService);

    try {
      const res = await authService.register(values);
      toast.success("employee added successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <main className=" min-h-screen ">
      <Container className="  ">
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting }) => {
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
              <form
                onSubmit={handleSubmit}
                className="  mx-auto w-full max-w-4xl rounded-lg bg-white px-6 py-12 sm:px-12 "
              >
                <div className=" flex flex-col gap-y-4 py-4 text-center uppercase leading-relaxed text-blue-500 ">
                  <h2 className=" text-4xl font-bold  ">
                    Register New Employee
                  </h2>
                </div>

                <fieldset className=" mb-9 grid grid-cols-2 gap-x-4 gap-y-4 ">
                  <Input
                    id="name"
                    name="name"
                    label="Fullname"
                    type="text"
                    placeholder="name"
                    error={errors.name || ""}
                    touched={touched.name}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

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
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    placeholder="phone number"
                    error={errors.phoneNumber || ""}
                    touched={touched.phoneNumber}
                    value={values.phoneNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Select
                    label="Sex"
                    name="sex"
                    id="sex"
                    className=" text-black "
                    value={values.sex}
                    onChange={handleChange}
                    options={[
                      { name: "Male", value: "male" },
                      { name: "Female", value: "female" },
                    ]}
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

                <div className="  ">
                  <Button
                    type="submit"
                    className=" max-w-sm "
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>

        <div className=" my-12 ">
          <Link
            href={"/employee"}
            className=" text-white underline-offset-4 hover:underline "
          >
            Back 
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default observer(WithPrimaryLayout(RegisterEmployeePage));
