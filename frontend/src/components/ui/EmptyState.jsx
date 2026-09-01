import { PackageOpen } from "lucide-react";

const EmptyState = ({
  title = "Nothing Found",
  message = "No data available.",
}) => {
  return (
    <div className="flex flex-col items-center py-16">
      <PackageOpen
        className="mb-4 text-slate-400"
        size={60}
      />

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;