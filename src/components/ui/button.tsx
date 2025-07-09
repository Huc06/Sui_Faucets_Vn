import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  size: "small" | "large";
}

export const Button = ({
  children,
  className,
  onClick,
  disabled,
  size,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        " text-[15px] rounded-[40px] text-[#F7F7F8] font-medium cursor-pointer bg-primary hover:bg-[#1A88FF] transition-all duration-300",
        size === "small" && "px-4 py-1",
        size === "large" && "px-[18px] py-[12px]",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const IconButton = ({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn(
        className,
        "rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
