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

export default function UserSignup() {
  const router = useRouter();
  const { auth } = useAuth();
  const {} = useUser();

  const initialValues: {
    fullname: string;
    email: string;
    phoneNumber: string;
    sex: string;
    password: string;
  } = {
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    sex: "",
  };

  React.useEffect(() => {
    if (auth) {
      router.replace("/dashboard");
      toast.success("LOGIN SESSION AVAILABLE", { toastId: "login-session" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className=" min-h-screen bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ">
      <Container className="  ">
        <div className=" flex flex-col gap-y-4 py-12 text-center uppercase leading-relaxed text-white ">
          <h2 className=" text-4xl font-bold  ">USER SIGNUP</h2>
          <div className=" text-xl ">Signup for an account</div>
        </div>

        <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            // setSubmitting(false);
            toast.success("hello world");
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
                className="  mx-auto w-full max-w-xl rounded-lg bg-white px-6 py-12 sm:px-12 "
              >
                <fieldset className=" mb-9 flex flex-col gap-y-6 ">
                  <Input
                    id="fullname"
                    name="fullname"
                    label="Fullname"
                    type="text"
                    placeholder="fullname"
                    error={errors.fullname || ""}
                    touched={touched.fullname}
                    value={values.fullname}
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

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Signup
                </Button>
              </form>
            </>
          )}
        </Formik>

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
