const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex justify-center items-center

      ${fullScreen ? "min-h-screen" : "py-20"}
      `}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
};

export default Loader;