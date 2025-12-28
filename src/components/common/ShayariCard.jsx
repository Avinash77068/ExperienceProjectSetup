import { ReactNode } from "react";

const ShayariCard = ({
  title,
  subtitle,
  footer,
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 ${className}`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      {/* Body */}
      <div className="text-gray-700">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t text-sm text-gray-500">{footer}</div>
      )}
    </div>
  );
};
export default ShayariCard;
