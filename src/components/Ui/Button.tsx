import Link from "next/link";

interface ButtonProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "white";
  outline?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = "Click Here",
  type = "primary",
  outline = false,
  className = "",
  icon,
  onClick,
  href,
}) => {
  const labelDiv = icon ? (
    <>
      {icon}
      {label}
    </>
  ) : (
    label 
  );

  if (href)
    return (
      <Link className={`btn bg-${type} ${className}`} href={href}>
        {labelDiv}
      </Link>
    );

  return (
    <button onClick={onClick} className={`btn bg-${type} ${className}`}>
      {labelDiv}
    </button>
  );
};

export default Button;
