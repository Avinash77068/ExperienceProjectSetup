import { ReactNode } from "react";

const ShayariCard = ({
  title,
  children,
  footer,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 cursor-pointer ${className}`}
    >
      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      )}

      {/* Body (Fully Custom UI from Outside) */}
      <div className="text-gray-700">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t text-sm text-gray-500">{footer}</div>
      )}
    </div>
  );
};

export default ShayariCard;
