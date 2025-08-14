import React from "react";

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 dark:bg-[#FFFFFF]/5 border border-white/10 rounded-xl shadow-lg backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);
