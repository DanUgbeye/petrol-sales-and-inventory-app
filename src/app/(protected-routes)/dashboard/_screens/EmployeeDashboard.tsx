import apiService from "@/client/modules/api/api";
import { SaleAPIService } from "@/client/modules/sale/api";
import { INVENTORY_TYPE } from "@/global-types/inventory.types";
import { NewSale } from "@/global-types/sale.types";
import { Formik } from "formik";
import { toast } from "react-toastify";
import React from "react";
import Input from "@/client/presentation/_shared/components/Input";
import Button from "@/client/presentation/_shared/components/Button";
import Select from "@/client/presentation/_shared/components/Select";
import { observer } from "mobx-react";
import userStore from "@/client/modules/user/store/user.store";
import { USER_ROLES } from "@/global-types/user.types";

function EmployeeDashboard() {
  const user = userStore.getUser();

  const initialValues: NewSale = {
    quantity: 0,
    type: INVENTORY_TYPE.FUEL,
  };

  async function handleSubmit(data: NewSale) {
    const saleApi = new SaleAPIService(apiService);
    let res;
    try {
      res = await saleApi.recordSale(data);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }

    toast.success("sale recorded");
  }

  return user && user.role === USER_ROLES.EMPLOYEE ? (
    <div className=" mx-auto my-12 w-full max-w-lg rounded-lg bg-white px-6 pb-20 pt-12 sm:px-12 ">
      <div className=" mb-4 text-center text-4xl font-bold uppercase leading-relaxed text-blue-700 ">
        <h2 className="  ">Record Sale</h2>
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
  ) : null;
}

export default observer(EmployeeDashboard);
