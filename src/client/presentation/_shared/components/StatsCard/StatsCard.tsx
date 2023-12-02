import React from "react";

export interface StatsCardProps {
  name: string;
  figure: number;
}

export default function StatsCard(props: StatsCardProps) {
  return (
    <div className=" flex flex-col justify-center items-center gap-y-3 ">
      <span className=" aspect-square h-full max-h-[10rem] w-full max-w-[10rem] grid place-items-center rounded-full border-4 text-6xl font-bold ">
        {props.figure}
      </span>

      <span className=" text-white text-2xl ">{props.name}</span>
    </div>
  );
}
