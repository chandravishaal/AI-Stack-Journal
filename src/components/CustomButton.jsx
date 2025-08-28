// import { Link } from "react-router-dom";

// // Minimalist and professional CustomButton in yellow theme
// export default function CustomButton({ children, onClick, to, className = "" }) {

//   // Minimalist styles: solid background, subtle border, smooth transition, professional appearance
//   const baseClasses =
//     "inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium text-black bg-yellow-400 border border-yellow-400 transition-colors duration-200 " +
//     "hover:bg-yellow-500 hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50";

//   // Render as Link if 'to' prop exists
//   if (to) {
//     return (
//       <Link to={to} className={`${baseClasses} ${className}`}>
//         {children}
//       </Link>
//     );
//   }

//   // Render as standard button
//   return (
//     <button onClick={onClick} className={`${baseClasses} ${className}`}>
//       {children}
//     </button>
//   );
// }


import { Link } from "react-router-dom";

/**
 * CustomButton
 * Props:
 *  - children
 *  - onClick
 *  - to (optional) -> renders Link when provided
 *  - className (optional)
 *  - pill (boolean) -> use pill rounded style (default: false)
 *  - size ("sm"|"md") -> small/medium sizing (default: "md")
 */
export default function CustomButton({
  children,
  onClick,
  to,
  className = "",
  pill = false,
  size = "md",
}) {
  const radius = pill ? "rounded-xl" : "rounded-lg";
  const padding = size === "sm" ? "px-4 py-1.5 text-sm" : "px-4 py-1.5 text-base";
  const base = [
    "inline-flex",
    "items-center",
    "justify-center",
    radius,
    padding,
    "font-semibold",
    "tracking-tight",
    "transition",
    "duration-200",
    "ease-out",
    "select-none",
    "cursor-pointer",
    // thin outline look
    "border",
    "border-yellow-400/90",
    // color
    "text-blackyellow-900",
    "dark:text-yellow-300",
    // transparent background, subtle hover fill
    "bg-transparent",
    "hover:bg-yellow-400/10",
    "dark:hover:bg-yellow-400/10",
    // subtle focus
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-yellow-400/25",
    // no heavy shadow by default (keeps minimal/premium)
  ].join(" ");

  const finalClass = `${base} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={finalClass} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={finalClass} type="button">
      {children}
    </button>
  );
}
