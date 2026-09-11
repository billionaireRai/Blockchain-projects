import React from "react";

export const Increasingdot = ({ Number , Color }: { Number: number; Color: string }) => {
  const DotArray = Array.from({ length: Number });

  return (
    <div className="flex items-center gap-1.5">
      {DotArray.map((_, index) => (
        <span
          key={index}
          className={`h-${(index + 1)} w-${(index + 1)} border border-${Color}-600 bg-${Color}-600 rounded-full`}
        />
      ))}
    </div>
  );
};