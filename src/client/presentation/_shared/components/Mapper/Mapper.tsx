import React from "react";

export interface MapperProps<T> {
  id: string;
  list: T[];
  component: React.ElementType<{ item: T; index: number }>;
}

export default function Mapper<T>(props: MapperProps<T>) {
  const { component: Component } = props;

  return (
    <>
      {props.list.map((item, index) => (
        <Component item={item} key={`${props.id}-${index}`} index={index} />
      ))}
    </>
  );
}
