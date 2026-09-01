import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-7xl font-bold">
        403
      </h1>

      <p className="mt-5 text-slate-500">
        You don't have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>

    </div>
  );
};

export default Forbidden;