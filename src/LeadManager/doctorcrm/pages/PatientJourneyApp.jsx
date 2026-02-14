import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { Dialog } from 'primereact/dialog';


// Patient data
const patientsData = [
  {
    id: '5876',
    name: 'Ravi Prakash',
    journey: [
      { stage: 'Initial Contact', color: 'text-blue-500', date: '15-01-2025', description: 'First appointment scheduled' },
      { stage: 'Consultation', color: 'text-orange-500', date: '20-01-2025', description: 'Initial consultation completed' },
      { stage: 'Diagnosis', color: 'text-purple-500', date: '25-01-2025', description: 'Diagnosis confirmed' },
      { stage: 'Treatment', color: 'text-pink-500', date: '01-02-2025', description: 'Treatment plan initiated' },
      { stage: 'Follow-up', color: 'text-orange-600', date: '15-02-2025', description: 'Follow-up scheduled' }
    ]
  },
  {
    id: '5877',
    name: 'Priya Sharma',
    journey: [
      { stage: 'Initial Contact', color: 'text-blue-500', date: '10-01-2025', description: 'First appointment scheduled' },
      { stage: 'Consultation', color: 'text-orange-500', date: '18-01-2025', description: 'Initial consultation completed' },
      { stage: 'Diagnosis', color: 'text-purple-500', date: '22-01-2025', description: 'Diagnosis confirmed' }
    ]
  },
  {
    id: '5878',
    name: 'Amit Kumar',
    journey: [
      { stage: 'Initial Contact', color: 'text-blue-500', date: '01-02-2025', description: 'First appointment scheduled' },
      { stage: 'Consultation', color: 'text-orange-500', date: '05-02-2025', description: 'Initial consultation completed' },
      { stage: 'Diagnosis', color: 'text-purple-500', date: '10-02-2025', description: 'Diagnosis confirmed' },
      { stage: 'Treatment', color: 'text-pink-500', date: '15-02-2025', description: 'Treatment plan initiated' }
    ]
  },
  {
    id: '5879',
    name: 'Sneha Patel',
    journey: [
      { stage: 'Initial Contact', color: 'text-blue-500', date: '05-01-2025', description: 'First appointment scheduled' },
      { stage: 'Consultation', color: 'text-orange-500', date: '12-01-2025', description: 'Initial consultation completed' }
    ]
  }
];


const PatientJourneyApp = () => {
  const [searchId, setSearchId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState(patientsData);

  const handleSearch = () => {
    if (searchId.trim() === '') {
      setFilteredPatients(patientsData);
    } else {
      const filtered = patientsData.filter(patient => 
        patient.id.includes(searchId) || patient.name.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Patient Journey Tracker</h1>
          <p className="text-gray-600">Search and track patient healthcare journeys</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95">
          {/* Search Section */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter patient ID or name..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <FaSearch className="text-lg" /> Search 
            </button>
          </div>

          {/* Patient Journey Table */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              Patient Journey
            </h2>
            
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Patient ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Patient Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Journey Stages</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                      onClick={() => handlePatientClick(patient)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold mr-3 shadow-md">
                            {patient.id.slice(-2)}
                          </div> */}
                          <span className="font-semibold text-gray-800">{patient.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-gray-700 font-medium">{patient.name}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {patient.journey.slice(0, 3).map((point, idx) => (
                            <FaMapMarkerAlt key={idx} className={`text-xl ${point.color}`} />
                          ))}
                          {patient.journey.length > 3 && (
                            <span className="text-sm text-gray-500 font-medium">+{patient.journey.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 font-medium shadow-md hover:shadow-lg transition-all transform group-hover:scale-105">
                          View Journey
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <FaSearch className="text-3xl text-gray-400" />
                          </div>
                          <p className="text-gray-500 font-medium">No patients found</p>
                          <p className="text-gray-400 text-sm">Try searching with a different ID or name</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Prime React Dialog for Patient Journey */}
        <Dialog
          visible={isDialogOpen}
          onHide={handleCloseDialog}
          style={{ width: '90vw', maxWidth: '1200px' }}
          dismissableMask
          className="patient-journey-dialog"
          draggable={false}
          // showHeader={false}
          // maximizable
          // closeOnEscape={false}
          // maximized={true}
          // breakpoints={{ '960px': '90vw', '641px': '100vw' }} 
        >
          {selectedPatient && (
            <div className="p-6">
              {/* Patient Info Header */}
              <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Patient Journey</h2>
                    <div className="flex items-center gap-6 text-blue-100">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Patient ID:</span>
                        <span className="bg-white text-black bg-opacity-20 px-4 py-1 rounded-lg font-bold">{selectedPatient.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Name:</span>
                        <span className="bg-white text-black bg-opacity-20 px-4 py-1 rounded-lg font-bold">{selectedPatient.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-6xl opacity-90">🏥</div>
                </div>
              </div>

              {/* Journey Wave Path */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-inner">
                <div className="relative flex items-center justify-between py-16">
                  {/* SVG Wave Path */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 50 60 Q 150 20, 250 60 T 450 60 T 650 60 T 850 60 T 1050 60`}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Journey Points */}
                  <div className="relative flex justify-between w-full" style={{ zIndex: 1 }}>
                    {selectedPatient.journey.map((point, index) => {
                      const positions = [
                        { top: '20%' },
                        { top: '80%' },
                        { top: '20%' },
                        { top: '80%' },
                        { top: '20%' }
                      ];
                      
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center animate-fade-in"
                          style={{
                            position: 'relative',
                            ...positions[index % positions.length],
                            animationDelay: `${index * 0.2}s`
                          }}
                        >
                          <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity"></div>
                            <FaMapMarkerAlt className={`text-5xl ${point.color} drop-shadow-2xl relative transition-transform group-hover:scale-125 cursor-pointer`} />
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                              <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl whitespace-nowrap border border-gray-700">
                                <div className="font-bold text-lg mb-1">{point.stage}</div>
                                <div className="text-blue-300 text-sm mb-2">{point.date}</div>
                                <div className="text-gray-300 text-xs">{point.description}</div>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45 border-r border-b border-gray-700"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Journey Stages Labels */}
                <div className="flex justify-between mt-8 px-4">
                  {selectedPatient.journey.map((point, index) => (
                    <div key={index} className="text-center" style={{ width: '140px' }}>
                      <div className="font-bold text-gray-800 mb-1">{point.stage}</div>
                      <div className="text-sm text-gray-500">{point.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey Timeline Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedPatient.journey.map((point, index) => (
                  <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all hover:border-blue-300">
                    <div className="flex items-start gap-4">
                      <FaMapMarkerAlt className={`text-3xl ${point.color} mt-1`} />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{point.stage}</h4>
                        <p className="text-sm text-gray-600 mb-2">{point.description}</p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{point.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Dialog>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PatientJourneyApp;