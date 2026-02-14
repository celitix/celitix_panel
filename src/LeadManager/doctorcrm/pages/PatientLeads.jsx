// import DashboardCards from "../components/DashboardCards";
import DashboardCards from "../components/LeadDocDashboardCards";
import LeadsTable from "../components/LeadsTable";
// import LeadDrawer from "@/components/LeadDrawer";

export default function PatientLeads() {
  return (
    <div className="w-full p-3">
      {/* <div className="flex items-center bg-blue-400 text-white p-3 rounded-lg mb-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
      </div> */}

      {/* <LeadDrawer/> */}

      {/* <DashboardCards /> */}
      <LeadsTable />
    </div>
  );
}
