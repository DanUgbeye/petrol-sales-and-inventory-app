import React from "react";
import { AuthContext } from "../context";

export default function useAuth() {
  const { auth, authLoading } = React.useContext(AuthContext);

  return { auth, authLoading };
}
