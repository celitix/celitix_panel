import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { FaUser, FaStethoscope } from "react-icons/fa";

const templatesData = {
  patient: {
    'Appointment': [
      { id: 1, title: 'Appointment Confirmation', message: 'Hello {{patient_name}}, your appointment with {{doctor_name}} is confirmed for {{appointment_date}} at {{appointment_time}} at {{facility_name}}.' },
      { id: 2, title: 'Appointment Reminder', message: 'Reminder: You have an appointment with {{doctor_name}} on {{appointment_date}} at {{appointment_time}}. Please arrive {{arrival_buffer}} early.' },
      { id: 3, title: 'Appointment Reschedule', message: 'Hi {{patient_name}}, your appointment on {{appointment_date}} has been rescheduled to {{new_appointment_time}}. Let us know if this works for you.' },
      { id: 4, title: 'Appointment Cancellation', message: 'Your appointment with {{doctor_name}} scheduled for {{appointment_date}} has been cancelled. Please contact us to book a new slot.' },
      { id: 5, title: 'Appointment Booking Success', message: 'Thank you {{patient_name}}. Your {{appointment_type}} appointment with {{doctor_name}} is successfully booked for {{appointment_date}}.' },
      { id: 6, title: 'Appointment Request Received', message: 'We haveve received your appointment request. Our team will confirm your visit with {{doctor_name}} shortly.' }
    ],
    'Schedule Availability': [
      { id: 7, title: 'Doctor Availability', message: 'Hello {{patient_name}}, {{doctor_name}} is available on {{available_dates}}. Choose a time that works best for you.' },
      { id: 8, title: 'New Slots Available', message: 'New appointment slots are now open for {{specialty_name}} consultations at {{facility_name}}.' },
      { id: 9, title: 'Earlier Slots Available', message: 'Good news! Earlier appointment slots are available on {{available_date}}. Would you like to reschedule?' },
      { id: 10, title: 'Schedule Updated', message: '{{doctor_name}}\'s schedule has been updated. Check available slots and book your appointment.' },
      { id: 11, title: 'Limited Slots Warning', message: 'Limited slots available for {{appointment_type}} consultations this week. Book early to avoid waiting.' },
      { id: 12, title: 'Extended Hours', message: 'We\'re currently offering extended clinic hours on {{extended_days}} for your convenience.' }
    ],
    'Follow-up': [
      { id: 13, title: 'Follow-up Reminder', message: 'Hello {{patient_name}}, this is a reminder to schedule your follow-up appointment with {{doctor_name}}.' },
      { id: 14, title: 'Follow-up Booking Request', message: 'We hope you\'re doing well. Please book your follow-up visit recommended on {{last_visit_date}}.' },
      { id: 15, title: 'Follow-up Due', message: 'Your follow-up consultation with {{doctor_name}} is due. Choose a convenient date to continue your care.' },
      { id: 16, title: 'Follow-up Advised', message: 'Thank you for your recent visit. A follow-up is advised within {{followup_duration}}.' },
      { id: 17, title: 'Follow-up Scheduled', message: 'Friendly reminder: Your follow-up appointment is scheduled for {{appointment_date}}.' },
      { id: 18, title: 'Questions Follow-up', message: 'If you have questions after your recent visit, we encourage you to book a follow-up consultation.' }
    ],
    'Reports Notification': [
      { id: 19, title: 'Report Available', message: 'Hello {{patient_name}}, your medical report from {{report_date}} is now available in the app.' },
      { id: 20, title: 'Report Ready', message: 'Your {{report_type}} report is ready. Please log in to {{platform_name}} to view it.' },
      { id: 21, title: 'Test Report Uploaded', message: 'We\'ve uploaded your test report. Contact {{facility_name}} if you have questions.' },
      { id: 22, title: 'Report Shared', message: '{{patient_name}}, your report has been shared securely with {{doctor_name}}.' },
      { id: 23, title: 'New Document Added', message: 'Notification: New medical document added to your records on {{upload_date}}.' },
      { id: 24, title: 'Requested Report Available', message: 'Your requested report is now available. Thank you for your patience.' }
    ],
    'Announcement': [
      { id: 25, title: 'Facility Closure', message: 'Dear {{patient_name}}, {{facility_name}} will remain closed on {{holiday_date}}.' },
      { id: 26, title: 'New Services', message: 'We\'re introducing new services at {{facility_name}} starting {{start_date}}.' },
      { id: 27, title: 'Hours Change', message: 'Important update: Clinic hours will change from {{effective_date}}.' },
      { id: 28, title: 'Updated Guidelines', message: 'For your safety, please review our updated clinic guidelines before your visit.' },
      { id: 29, title: 'New Doctor Addition', message: 'We\'re pleased to announce the addition of {{doctor_name}} to our medical team.' },
      { id: 30, title: 'Thank You Message', message: 'Thank you for trusting {{facility_name}}. We\'re committed to your continued care.' }
    ]
  },
  doctor: {
    'Appointment': [
      { id: 31, title: 'Appointment Confirmed', message: 'You have a confirmed appointment with {{patient_name}} on {{appointment_date}} at {{appointment_time}}.' },
      { id: 32, title: 'Upcoming Appointment', message: 'Reminder: Upcoming appointment with {{patient_name}} scheduled for {{appointment_date}} at {{appointment_time}}.' },
      { id: 33, title: 'Patient Rescheduled', message: 'Appointment update: {{patient_name}} has rescheduled their visit to {{new_appointment_time}} on {{appointment_date}}.' },
      { id: 34, title: 'Appointment Cancelled', message: 'The appointment with {{patient_name}} on {{appointment_date}} has been cancelled.' },
      { id: 35, title: 'New Booking', message: 'New appointment booked: {{patient_name}} | {{appointment_type}} | {{appointment_date}} {{appointment_time}}.' },
      { id: 36, title: 'Pending Confirmation', message: 'Pending confirmation: Appointment request from {{patient_name}} for {{preferred_date}}.' }
    ],
    'Schedule Availability': [
      { id: 37, title: 'Schedule Open', message: 'Your schedule for {{schedule_date}} is now open for patient bookings.' },
      { id: 38, title: 'Unfilled Slots', message: 'Available slots remain unfilled for {{schedule_date}} between {{time_range}}.' },
      { id: 39, title: 'Extended Hours Update', message: 'Schedule update: Clinic hours extended on {{extended_days}}.' },
      { id: 40, title: 'Open Slots Count', message: 'You have {{open_slots_count}} open appointment slots on {{schedule_date}}.' },
      { id: 41, title: 'Availability Shared', message: 'Your availability has been shared with patients for booking.' },
      { id: 42, title: 'Schedule Conflict', message: 'Schedule adjustment required: Conflicting appointments detected on {{schedule_date}}.' }
    ],
    'Follow-up': [
      { id: 43, title: 'Follow-up Recommended', message: 'Follow-up recommended for {{patient_name}} after visit on {{last_visit_date}}.' },
      { id: 44, title: 'Follow-up Scheduled', message: 'Follow-up appointment scheduled with {{patient_name}} on {{appointment_date}}.' },
      { id: 45, title: 'Follow-up Pending', message: 'Reminder: Follow-up pending for {{patient_name}}.' },
      { id: 46, title: 'Follow-up Not Scheduled', message: '{{patient_name}} has not yet scheduled their recommended follow-up.' },
      { id: 47, title: 'Follow-up Completed', message: 'Follow-up visit completed for {{patient_name}} on {{appointment_date}}.' },
      { id: 48, title: 'Follow-up Requested', message: 'Patient {{patient_name}} requested a follow-up consultation.' }
    ],
    'Reports Notification': [
      { id: 49, title: 'New Report Available', message: 'New report available for {{patient_name}} dated {{report_date}}.' },
      { id: 50, title: 'Report Uploaded', message: '{{report_type}} report uploaded for {{patient_name}}.' },
      { id: 51, title: 'Review Pending', message: 'Patient report review pending: {{patient_name}}.' },
      { id: 52, title: 'Updated Report', message: 'Updated diagnostic report added to {{patient_name}}\'s records.' },
      { id: 53, title: 'Reports Awaiting Review', message: 'You have new patient reports awaiting review today.' },
      { id: 54, title: 'Report Shared', message: '{{patient_name}}\'s report has been shared with you for reference.' }
    ],
    'Announcement': [
      { id: 55, title: 'Schedule Update', message: 'Announcement: Clinic schedule update effective {{effective_date}}.' },
      { id: 56, title: 'New Guidelines', message: 'New operational guidelines have been released. Please review before {{deadline_date}}.' },
      { id: 57, title: 'Team Addition', message: 'Welcome {{new_doctor_name}} to the {{department_name}} team.' },
      { id: 58, title: 'System Maintenance', message: 'System maintenance scheduled on {{maintenance_date}}. Limited access expected.' },
      { id: 59, title: 'Policy Update', message: 'Important policy update regarding patient documentation.' },
      { id: 60, title: 'Thank You', message: 'Thank you for your continued support and collaboration at {{facility_name}}.' }
    ]
  }
};

export default function DoctorsTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('Appointment');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [role, setRole] = useState("patient");

  const isPatient = role === "patient";
  const categories = Object.keys(templatesData.patient);
  const currentTemplates = templatesData[role][selectedCategory];

  const handleCategoryClick = (category) => setSelectedCategory(category);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setDialogVisible(true);
  };

  const handleClose = () => {
    setDialogVisible(false);
    setSelectedTemplate(null);
  };

  const handleSave = () => {
    alert(`Template "${selectedTemplate?.title}" saved!`);
    handleClose();
  };

  return (
    <div className=" bg-linear-to-br from-gray-50 to-blue-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-green-900/70 p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Templates
          </h1>
          <p className="text-blue-100 mt-1">
            Choose a category and select a template
          </p>
        </div>

        {/* Category Tabs and Role Toggle */}
        <div className="flex items-center justify-between flex-col md:flex-row px-2 my-6">
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md scale-[1.03] cursor-pointer'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 cursor-pointer'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Role Toggle */}
          <div className="flex items-center gap-3 ">
            <span className="text-sm font-medium text-gray-600">
              {isPatient ? 'Patient' : 'Doctor'}
            </span>
            <button
              onClick={() => setRole(isPatient ? "doctor" : "patient")}
              aria-label="Toggle role"
              className={`relative w-20 h-10 rounded-full transition-colors duration-300 ${isPatient ? "bg-blue-500" : "bg-green-500"
                }`}
            >
              <span
                className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 ${isPatient ? "translate-x-0" : "translate-x-10"
                  }`}
              >
                {isPatient ? (
                  <FaUser className="text-blue-500 text-lg" />
                ) : (
                  <FaStethoscope className="text-green-500 text-lg" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className="group cursor-pointer rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {template.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {dialogVisible && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <span className="text-xl font-semibold text-gray-800">
                {selectedTemplate?.title}
              </span>
              <button
                onClick={handleClose}
                className="group p-2 rounded-full transition cursor-pointer hover:bg-gray-100"
              >
                <FiX
                  size={20}
                  className="text-gray-500 transition-colors group-hover:text-red-500"
                />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedTemplate?.message}
              </p>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow transition cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}