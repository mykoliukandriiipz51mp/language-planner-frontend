import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "right",
  children,
  className = "",
  disabled,
  ...props
}) => {
  // Базові класи для кнопки згідно з дизайном (Rounded Full, Font Encode Sans Expanded)
  const baseStyles =
    "inline-flex items-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

  // Варіанти стилів (Primary = #4F46E5, Outline = сіра рамка для Google)
  const variants = {
    primary:
      "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm active:scale-[0.99]",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 shadow-2xs active:scale-[0.99]",
    secondary: "bg-indigo-100 hover:bg-indigo-200 text-indigo-900 shadow-sm",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  // Розміри
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} ${icon ? " justify-between" : " justify-center"}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-3 flex items-center">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-3 flex items-center">{icon}</span>
      )}
    </button>
  );
};
