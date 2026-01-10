import { Link } from "react-router-dom";

export const Button = ({
  to,
  children,
  variant = "primary",
  size = "sm",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-white text-purple-700 hover:bg-yellow-300 focus:ring-yellow-300",
    outline:
      "border border-white text-white hover:bg-white hover:text-purple-700 focus:ring-white",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const classes = [
    base,
    variants[variant],
    sizes[size],
    disabledStyles,
    className,
  ].join(" ");

  /* Render as Link */
  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  /* Render as Button */
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};
