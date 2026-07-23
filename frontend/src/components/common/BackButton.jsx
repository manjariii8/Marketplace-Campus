import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
    >
      <FiArrowLeft className="text-xl" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;