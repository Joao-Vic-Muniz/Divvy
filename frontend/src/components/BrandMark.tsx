type BrandMarkProps = {
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "h-8 w-8 rounded-lg text-xs",
  md: "h-10 w-10 rounded-xl text-sm",
};

export default function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span
      className={`flex items-center justify-center bg-gradient-to-br from-primary to-secondary font-bold text-white shadow-lg shadow-primary/20 ${sizeClasses[size]} ${className}`.trim()}
    >
      D
    </span>
  );
}
