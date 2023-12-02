import React, { ComponentType } from "react";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";

export default function WithOnProtectedRoute<P extends object>(
  WrappedComponent: ComponentType<P>,
  restProps?: ProtectedRouteProps
) {
  return function WithProtectedRouteComponent(
    componentProps: P
  ): React.JSX.Element {
    return (
      <ProtectedRoute {...restProps}>
        <WrappedComponent {...componentProps} />
      </ProtectedRoute>
    );
  };
}
