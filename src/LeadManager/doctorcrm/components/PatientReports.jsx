import UniversalButton from "@/components/common/UniversalButton";
import { FiDownload } from "react-icons/fi";
import { MdBloodtype, MdHealing, MdLocalHospital, MdScience, MdCropPortrait } from "react-icons/md";
// import UniversalButton from "./UniversalButton";

const reports = [
  {
    name: "David Marshall",
    description: "Hemoglobin",
    icon: (
      <div className="w-8 h-8 text-blue-400 bg-blue-100 rounded-full p-1 flex items-center justify-center">
        <MdBloodtype size={24} />
      </div>
    ),
  },
  {
    name: "Thomas McLean",
    description: "X Ray",
    icon: (
      <div className="w-8 h-8 text-green-400 bg-green-100 rounded-full p-1 flex items-center justify-center">
        <MdHealing size={24} />
      </div>
    ),
  },
  {
    name: "Greta Kinney",
    description: "MRI Scan",
    icon: (
      <div className="w-8 h-8 text-red-400 bg-red-100 rounded-full p-1 flex items-center justify-center">
        <MdLocalHospital size={24} />
      </div>
    ),
  },
  {
    name: "Larry Wilburn",
    description: "Blood Test",
    icon: (
      <div className="w-8 h-8 text-purple-400 bg-purple-100 rounded-full p-1 flex items-center justify-center">
        <MdScience size={24} />
      </div>
    ),
  },
  {
    name: "Reyan Verol",
    description: "CT Scan",
    icon: (
      <div className="w-8 h-8 text-teal-400 bg-teal-100 rounded-full p-1 flex items-center justify-center">
        <MdCropPortrait size={24} />
      </div>
    ),
  },
  {
    name: "David Marshall",
    description: "Hemoglobin",
    icon: (
      <div className="w-8 h-8 text-blue-400 bg-blue-100 rounded-full p-1 flex items-center justify-center">
        <MdBloodtype size={24} />
      </div>
    ),
  },
];

export default function PatientReports() {
  return (
    <div className="w-full bg-white rounded-2xl space-y-4 p-4">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-gray-800 text-lg">Patient Reports</h2>
        <UniversalButton
          label="View All"
          variant="primary" // or "secondary" if you want gray
        />
      </div>
      <ul className="flex flex-col gap-2  overflow-y-auto h-70 ">
        {reports.map(({ name, description, icon }) => (
          <li key={name} className="flex items-center p-2 justify-between border-b me-2 hover:bg-[#f5f7fb] transition-all duration-100 ">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <p className="font-semibold text-gray-800 text-sm">{name}</p>
                <p className="text-xs text-gray-400">{description}</p>
              </div>
            </div>
            <button className="bg-[#e8eef4] p-2 rounded-md hover:bg-[#d5e5f6]">
              <FiDownload className="w-5 h-5 text-gray-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
