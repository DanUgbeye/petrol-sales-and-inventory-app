"use client";
import apiService from "@/client/modules/api/api";
import { OrderAPIService } from "@/client/modules/order/api";
import userStore from "@/client/modules/user/store/user.store";
import { Container } from "@/client/presentation/_shared/components/Container";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { INVENTORY_TYPE } from "@/global-types/inventory.types";
import { NewOrder } from "@/global-types/order.types";
import { Formik } from "formik";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import React from "react";
import Select from "@/client/presentation/_shared/components/Select";
import Input from "@/client/presentation/_shared/components/Input";
import Button from "@/client/presentation/_shared/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreateOrderPage() {
  const orderService = new OrderAPIService(apiService);
  const user = userStore.getUser();
  const router = useRouter();

  const initialValues: NewOrder = {
    quantity: 40000,
    type: INVENTORY_TYPE.FUEL,
    pricePerLitre: 650,
  };

  async function handleSubmit(data: NewOrder) {
    let res;
    try {
      res = await orderService.createOrder(data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    toast.success("order created");
    router.replace("/orders");
  }

  return user ? (
    <Container className=" ">
      <div className=" mx-auto mt-12 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
        <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-blue-700 ">
          <h2 className="  ">Create Order</h2>
        </div>

        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting, setValues }) => {
            await handleSubmit(values);
            setSubmitting(false);
            setValues(initialValues);
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
                  <Select
                    id="type"
                    name="type"
                    label="Inventory Type"
                    placeholder="inventory type"
                    error={errors.type || ""}
                    touched={touched.type}
                    value={values.type}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    options={[
                      { name: "Fuel", value: "fuel" },
                      { name: "Kerosene", value: "kerosene" },
                    ]}
                  />

                  <Input
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    placeholder="quantity"
                    error={errors.quantity || ""}
                    touched={touched.quantity}
                    value={values.quantity || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  <Input
                    id="pricePerLitre"
                    name="pricePerLitre"
                    label="Price  Per Litre"
                    type="number"
                    placeholder="pricePerLitre"
                    error={errors.pricePerLitre || ""}
                    touched={touched.pricePerLitre}
                    value={values.pricePerLitre || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </fieldset>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Place Order
                </Button>
              </form>
            </>
          )}
        </Formik>
      </div>

      <div className=" my-12 ">
        <Link
          href={"/orders"}
          className=" text-white underline-offset-4 hover:underline "
        >
          Back
        </Link>
      </div>
    </Container>
  ) : null;
}

export default observer(WithPrimaryLayout(CreateOrderPage));
