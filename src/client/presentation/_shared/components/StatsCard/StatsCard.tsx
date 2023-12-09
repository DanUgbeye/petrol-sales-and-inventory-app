import React from "react";

export interface StatsCardProps {
  name: string;
  unit?: string;
  figure: number | string;
}

export default function StatsCard(props: StatsCardProps) {
  return (
    <div className=" flex flex-col items-center justify-center gap-y-3 ">
      <div className=" flex aspect-square h-full max-h-[10rem] w-full max-w-[10rem] flex-col items-center justify-center gap-y-2 rounded-full border-4 text-6xl font-bold ">
        <span className=" pt-4 ">{props.figure}</span>
        {props.unit && (
          <span className=" text-base font-light ">{props.unit}</span>
        )}
      </div>

      <span className=" text-2xl text-white ">{props.name}</span>
    </div>
  );
}
