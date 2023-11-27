import React from "react";
import { ButtonProps } from "./Button";

export default function useButtonController(props: ButtonProps) {
  const [loading, setLoading] = React.useState(false);

  function handleClick() {}

  return {
    loading,
    setLoading,
    handleClick,
  };
}
