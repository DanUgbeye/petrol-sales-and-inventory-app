import React from "react";
import useButtonController from "./Button.controller";

export interface ButtonProps {}

export default function Button(props: ButtonProps) {
  const { handleClick } = useButtonController(props);

  return <button onClick={(e) => handleClick()}>Button</button>;
}
