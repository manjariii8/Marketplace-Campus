import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-8xl font-bold">
        500
      </h1>

      <p className="mt-5 text-slate-500">
        Something went wrong.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back Home
      </Link>

    </div>
  );
};

export default ServerError;