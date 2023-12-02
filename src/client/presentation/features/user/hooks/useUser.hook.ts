import React from "react";
import { UserContext } from "../context";

export default function useUser() {
  const { userLoading, user } = React.useContext(UserContext);
  return { userLoading, user };
}
