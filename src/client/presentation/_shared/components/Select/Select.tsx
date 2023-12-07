import React, { SelectHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { SelectOption } from "./Select.types";
import Mapper from "../Mapper";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  error?: string;
  touched?: boolean;
  options: SelectOption[];
}

export default function Select(props: SelectProps) {
  const { label, error, children, touched, options, ...rest } = props;

  return (
    <div className=" flex flex-col ">
      {label && (
        <label
          htmlFor={rest.id}
          className=" mb-1 min-w-fit text-left capitalize text-black "
        >
          {label}
        </label>
      )}

      <select
        {...rest}
        className={twMerge(
          " flex h-12 w-full items-center rounded-lg border border-gray-400 bg-white px-3 outline-0 focus-visible:border-2 focus-visible:border-blue-700 focus-visible:ring-0 ",
          touched && error ? " border-2 border-red-400 " : "  ",
          rest.className || ""
        )}
      >
        <option value="" className=" ">
          {`select ${(label || rest.name)?.toLocaleLowerCase()}`}
        </option>

        <Mapper
          id={`${rest.name}-option`}
          list={[...options]}
          component={({ item: option, index }) => (
            <option
              key={`${props.name}-${option.name}-option-${index}`}
              value={option.value}
            >
              {option.name}
            </option>
          )}
        />
      </select>

      {error && touched && (
        <div className=" mt-1 pl-3 text-sm font-medium text-red-400 ">
          {error}
        </div>
      )}
    </div>
  );
}
