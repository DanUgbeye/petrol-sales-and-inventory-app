import React, { ComponentType } from "react";
import PrimaryLayout, { PrimaryLayoutProps } from "./PrimaryLayout";

function WithPrimaryLayout<P extends object>(
  WrappedComponent: ComponentType<P>,
  layoutProps?: PrimaryLayoutProps
) {
  return function WithPrimaryLayoutComponent(props: P) {
    return (
      <PrimaryLayout {...layoutProps}>
        <WrappedComponent {...props} />
      </PrimaryLayout>
    );
  };
}

export default WithPrimaryLayout;
