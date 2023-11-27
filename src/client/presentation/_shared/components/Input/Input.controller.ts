import React from "react";
import { InputProps } from "./Input";

export default function useInputController(props: InputProps) {
  const [value, setValue] = React.useState("");

  function handleChange() {}

  return {
    value,
    handleChange,
  };
}
