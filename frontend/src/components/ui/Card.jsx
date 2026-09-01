import { cn } from "../../utils/cn";

const Card = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-sm border border-slate-200 p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;