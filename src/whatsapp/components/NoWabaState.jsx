import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const NoWabaState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <FaWhatsapp size={64} className="text-green-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        No WhatsApp Account Found
      </h2>
      <p className="text-gray-500 mb-6">
        Please onboard a WhatsApp Business Account to continue.
      </p>
      <button
        onClick={() => navigate("/wmanagewaba")}
        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Onboard WhatsApp
      </button>
    </div>
  );
};

export default NoWabaState;
