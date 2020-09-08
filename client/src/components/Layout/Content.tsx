import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Content: React.FunctionComponent<Props> = ({ children }) => (
  <main>{children}</main>
);
