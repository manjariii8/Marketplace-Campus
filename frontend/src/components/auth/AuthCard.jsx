const AuthCard = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div
          className="
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-slate-200/80
            bg-white
            p-6
            shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)]
            sm:p-8
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;