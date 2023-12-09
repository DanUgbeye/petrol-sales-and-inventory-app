"use client";
import apiService from "@/client/modules/api/api";
import authStore from "@/client/modules/auth/store/auth.store";
import { InventoryAPIService } from "@/client/modules/inventory/api";
import Button from "@/client/presentation/_shared/components/Button";
import { Container } from "@/client/presentation/_shared/components/Container";
import Input from "@/client/presentation/_shared/components/Input";
import Select from "@/client/presentation/_shared/components/Select";
import WithPrimaryLayout from "@/client/presentation/layouts/primary-layout/WithPrimaryLayout";
import { INVENTORY_TYPE, NewInventory } from "@/global-types/inventory.types";
import { Formik } from "formik";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CreateInventoryPage() {
  const auth = authStore.getAuth();
  const router = useRouter();
  const inventoryService = new InventoryAPIService(apiService);

  const initialValues: NewInventory = {
    type: INVENTORY_TYPE.FUEL,
    pricePerLitre: 650,
  };

  async function handleSubmit(data: NewInventory) {
    let res;
    try {
      res = await inventoryService.createInventory(data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    toast.success("inventory created");
    router.replace("/inventory");
  }

  return (
    <Container>
      <div className=" mx-auto mt-6 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
        <div className=" mb-6 text-center text-3xl font-bold uppercase leading-relaxed text-blue-700 ">
          <h2 className="  ">Create New Inventory</h2>
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
                  Create
                </Button>
              </form>
            </>
          )}
        </Formik>
      </div>

      <div className=" my-12 ">
        <Link
          href={"/inventory"}
          className=" text-white underline-offset-4 hover:underline "
        >
          Back
        </Link>
      </div>
    </Container>
  );
}

export default observer(WithPrimaryLayout(CreateInventoryPage));
