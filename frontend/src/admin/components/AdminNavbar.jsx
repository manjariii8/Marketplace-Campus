import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <h1 className="text-2xl font-bold text-black-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;