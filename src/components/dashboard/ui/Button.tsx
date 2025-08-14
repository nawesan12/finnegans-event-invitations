import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#04102D] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: { [key: string]: string } = {
    default:
      "bg-[#4BC3FE] text-[#04102D] hover:bg-[#8694FF] focus:ring-[#4BC3FE]",
    danger: "bg-[#FE4D17] text-white hover:bg-red-700 focus:ring-[#FE4D17]",
    ghost:
      "hover:bg-white/10 text-white/80 hover:text-white focus:ring-white/20",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
