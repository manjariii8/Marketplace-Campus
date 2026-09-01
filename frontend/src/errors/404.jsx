import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-8xl font-bold">
        404
      </h1>

      <p className="mt-5 text-slate-500">
        Page not found.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Home
      </Link>

    </div>
  );
};

export default NotFound;