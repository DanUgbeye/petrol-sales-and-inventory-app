"use client";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useInputController from "./Input.controller";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  touched?: boolean;
}

export default function Input(props: InputProps) {
  const { modifiedProps, showPw, setShowPw } = useInputController(props);
  const { label, error, touched, ...restProps } = modifiedProps;

  return (
    <div className=" flex w-full flex-col ">
      {label && (
        <label htmlFor={restProps.id} className=" mb-1 min-w-fit text-left ">
          {label}
        </label>
      )}

      <div className=" relative h-12 w-full ">
        <input
          {...restProps}
          className={twMerge(
            ` flex h-12 w-full items-center rounded-lg border text-black border-gray-400 px-3 outline-0 focus-visible:border-2 focus-visible:border-blue-700 focus-visible:ring-0 disabled:bg-gray-100 disabled:text-gray-400 `,
            touched && error ? " border-2 border-red-400 " : " ",
            restProps.className || ""
          )}
        />

        {props.type === "password" && (
          <button
            type="button"
            onClick={() => setShowPw((prev) => !prev)}
            className=" absolute right-3 top-[50%] grid h-10 w-12 -translate-y-[50%] place-items-center "
          >
            {!showPw ? (
              <IoMdEyeOff className=" h-6 w-6 text-black/80 " />
            ) : (
              <IoMdEye className=" h-6 w-6 text-black/80 " />
            )}
          </button>
        )}
      </div>

      {error && touched && (
        <div className="  mt-1 pl-3 text-sm font-medium text-red-400 ">
          {error}
        </div>
      )}
    </div>
  );
}
