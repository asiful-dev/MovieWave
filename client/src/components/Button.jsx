import React from "react";

/**
 * Reusable Button component with customizable styles and props.
 *
 * @component
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered inside the button.
 * @param {string} [props.bgColor="bg-primary-700"] - Tailwind CSS class for button background color.
 * @param {string} [props.textColor="white"] - Tailwind CSS class for button text color.
 * @param {string} [props.hoverColor="bg-primary-500"] - Tailwind CSS class for button hover background color.
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {...any} props - Additional props passed to the button element.
 * @returns {JSX.Element} The rendered button component.
 */

const Button = ({
  children,
  bgColor = "bg-primary-700",
  textColor = "white",
  
  className,
  ...props
}) => {
  return (
    <button
      className={`${bgColor} ${textColor} cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
