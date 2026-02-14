import React from 'react'
import PatientReports from '../components/PatientReports';
import DoctorStatusCard from '../components/DoctorStatusCard';
import AppointmentsSection from '../components/AppointmentsSection';
import TopDepartments from '../components/TopDepartments';
import PatientVisitsCard from '../components/PatientVisitsCard';
import PatientVisitsChart from '../components/PatientVisitsCard';
import LeadDocDashboardCards from '../components/LeadDocDashboardCards';
import LeadSourceChart from '../components/LeadSourceChart';
import PatientsStatistics from '../components/PatientsStatistics';


const LeadDocDashboard = () => {
  return (
    <div className='flex flex-col bg-linear-to-tl from-[#f0f3fb] to-[#ebeef8] gap-5 w-full overflow-scroll h-full p-2'>

      {/* <div className="flex p-3  bg-blue-500 rounded-xl">
        <h2 className='text-2xl text-white'>
          LMS
        </h2>
      </div> */}
      <LeadDocDashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <LeadSourceChart />
        <PatientsStatistics />
        {/* <DoctorPerformanceChart /> */}

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PatientVisitsCard />
        <TopDepartments />
        <PatientReports />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full lg:h-120 ">
        <AppointmentsSection />

        <DoctorStatusCard />
      </div>
    </div>
  )
}

export default LeadDocDashboard