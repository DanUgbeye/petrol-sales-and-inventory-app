"use client";
import apiService from "@/client/modules/api/api";
import { SaleAPIService } from "@/client/modules/sale/api";
import Button from "@/client/presentation/_shared/components/Button";
import { Container } from "@/client/presentation/_shared/components/Container";
import Input from "@/client/presentation/_shared/components/Input";
import Spinner from "@/client/presentation/_shared/components/Spinner";
import StatsCard from "@/client/presentation/_shared/components/StatsCard";
import useUser from "@/client/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { NewOrder } from "@/global-types/order.types";
import { USER_ROLES } from "@/global-types/user.types";
import { Formik } from "formik";
import { observer } from "mobx-react";
import React from "react";
import { toast } from "react-toastify";

function DashboardPage() {
  const { user } = useUser();
  const loading = false;

  const initialValues: NewOrder = {
    quantity: 40000,
    type: "",
  };

  async function handleSubmit(data: NewOrder) {
    const saleApi = new SaleAPIService(apiService);
    let res;
    try {
      res = await saleApi.recordSale(data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  }

  return user ? (
    <main className="h-full min-h-full text-white ">
      <Container>
        {user.role === USER_ROLES.MANAGER && (
          <>
            {loading && (
              <div className=" grid w-full place-items-center ">
                <Spinner className=" h-10 w-10 text-white " />{" "}
              </div>
            )}

            {!loading && (
              <div className=" w-full space-y-12 ">
                <div className=" flex justify-between gap-x-12 ">
                  <div className=" flex w-full max-w-lg flex-col gap-y-12 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
                    <h2 className=" text-sm font-bold ">TOTAL SALE</h2>
                    <div className=" grid w-full  grid-cols-2 justify-between gap-y-8  ">
                      <StatsCard name="Quantity" figure={4} />
                      <StatsCard name="Amount" figure={14} />
                    </div>
                  </div>

                  <div className=" flex w-full max-w-lg flex-col gap-y-12 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
                    <h2 className=" text-sm font-bold ">MONTH SALE</h2>
                    <div className=" grid w-full  grid-cols-2 justify-between gap-y-8  ">
                      <StatsCard name="Quantity" figure={4} />
                      <StatsCard name="Amount" figure={14} />
                    </div>
                  </div>
                </div>

                <div className=" flex w-full max-w-lg flex-col gap-y-12 rounded-lg bg-white/30 py-8 backdrop-blur-sm ">
                  <h2 className=" text-sm font-bold ">INVENTORY LEVELS</h2>

                  <div className=" grid w-full grid-cols-2 justify-between gap-y-8  ">
                    <div className=" flex flex-col items-start gap-y-6 px-8 ">
                      <div className=" text-4xl font-light ">Fuel</div>
                      <div className=" flex items-end gap-x-2 ">
                        <span className=" text-5xl font-bold ">2000</span>
                        <span className=" text-sm font-light ">Litres</span>
                      </div>
                    </div>

                    <div className=" flex flex-col items-start gap-y-6 px-8 ">
                      <div className=" text-4xl font-light ">Kerosene</div>
                      <div className=" flex items-end gap-x-2 ">
                        <span className=" text-5xl font-bold ">2000</span>
                        <span className=" text-sm font-light ">Litres</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {user.role === USER_ROLES.EMPLOYEE && (
          <>
            <div className=" mx-auto my-12 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
              <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-blue-700 ">
                <h2 className="  ">Record Sale</h2>
              </div>

              <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={async (values, { setSubmitting }) => {
                  await handleSubmit(values);

                  setTimeout(() => {
                    console.log(values);
                    setSubmitting(false);
                  }, 2000);
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
                          id="type"
                          name="type"
                          label="Inventory Type"
                          type="text"
                          placeholder="inventory type"
                          error={errors.type || ""}
                          touched={touched.type}
                          value={values.type}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />

                        <Input
                          id="quantity"
                          name="quantity"
                          label="Password"
                          type="number"
                          placeholder="quantity"
                          error={errors.quantity || ""}
                          touched={touched.quantity}
                          value={values.quantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </fieldset>

                      <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        Record
                      </Button>
                    </form>
                  </>
                )}
              </Formik>
            </div>
          </>
        )}
      </Container>
    </main>
  ) : null;
}

export default observer(WithPrimaryLayout(DashboardPage));
