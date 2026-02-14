import { useEffect, useState } from "react";
// import InputField from "@/components/InputField";
// import DropdownWithSearch from "@/components/DropdownWithSearch";
import { Trash2 } from "lucide-react";
// import UniversalTextArea from "@/components/UniversalTextArea";
// import UniversalButton from "@/components/UniversalButton";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import UniversalButton from "@/components/common/UniversalButton";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import InputField from "@/components/layout/InputField";

/* ================= OPTIONS ================= */
const departmentOptions = [
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "dermatology", label: "Dermatology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "general_medicine", label: "General Medicine" },
];

const specialistMap = {
  cardiology: [
    { value: "heart", label: "Heart Specialist" },
    { value: "interventional", label: "Interventional Cardiologist" },
  ],
  neurology: [
    { value: "brain", label: "Brain Specialist" },
    { value: "neuro_surgeon", label: "Neuro Surgeon" },
  ],
  orthopedics: [
    { value: "bone", label: "Bone Specialist" },
    { value: "joint", label: "Joint Replacement Specialist" },
  ],
  dermatology: [
    { value: "skin", label: "Skin Specialist" },
    { value: "cosmetic", label: "Cosmetologist" },
  ],
  pediatrics: [
    { value: "child", label: "Child Specialist" },
    { value: "neonatal", label: "Neonatologist" },
  ],
  general_medicine: [{ value: "general", label: "General Physician" }],
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
];

/* ================= COMPONENT ================= */
const AddDoctor = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    id: "#DR0005",
    firstName: "",
    lastName: "",
    department: "",
    specialist: "",
    fees: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    registrationNo: "",
    languages: [],
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    displayName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [department, setDepartment] = useState("");
  const [specialist, setSpecialist] = useState("");

  const specialistOptions = department ? specialistMap[department] || [] : [];

  const [education, setEducation] = useState([
    { institute: "", qualification: "", year: "" },
  ]);

  const [experience, setExperience] = useState([
    { hospital: "", role: "", from: "", to: "" },
  ]);

  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  const [membership, setMembership] = useState([
    { organization: "", year: "", Description: "" },
  ]);

  const [awards, setAwards] = useState([
    { title: "", year: "", Description: "" },
  ]);

  /* ================= HANDLERS ================= */
  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleArrayChange = (setter, index, key, value) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const payload = {
      ...form,
      education,
      experience,
      socialMedia,
      membership,
      awards,
      image,
    };
    console.log("SUBMIT DATA 👉", payload);
  };

  /* ================= IMAGE CLEANUP ================= */
  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  return (
    <div className="bg-gray-50 p-4  relative h-full">
      {/* header */}
      <div className=" sticky top-0 flex flex-col md:flex-row md:items-center justify-between px-3 py-2 rounded-xl bg-white  mb-4  border  ">
        <h1 className="text-2xl font-semibold">Add Doctor</h1>
        <Link to="/leadmanagement/doctorcrm/managedoctor" className=" flex items-center gap-1 font-medium hover:underline  text-blue-600">
          <MdKeyboardDoubleArrowLeft /> Back to Doctors{" "}
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-4 h-full overflow-scroll border pb-10">
        {/* ================= SIDEBAR ================= */}
        <div className="  col-span-12 md:col-span-3">
          <div className="bg-white rounded-xl p-4 space-y-3">
            {[
              { id: "basic", label: "Basic Information" },
              { id: "extra", label: "Extra Information" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 p-3 rounded-lg border text-sm
                  ${activeTab === tab.id
                    ? "bg-blue-50 border-blue-500 font-medium"
                    : "text-gray-600"
                  }`}
              >
                <span
                  className={`h-3 w-3 rounded-full ${activeTab === tab.id ? "bg-blue-600" : "border"
                    }`}
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-lg border p-6 space-y-8">
            {/* ================= BASIC TAB ================= */}
            {activeTab === "basic" && (
              <>
                {/* PROFILE IMAGE */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Profile Image <span className="text-red-500"> * </span>
                  </label>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 rounded-lg bg-gray-200 overflow-hidden">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                          Image
                        </div>
                      )}
                    </div>

                    <label className="px-4 py-2 bg-black text-white text-sm rounded cursor-pointer">
                      Change Image
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>

                {/* BASIC INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="ID" value={form.id} disabled />

                  <InputField
                    label="First Name"
                    required={true}
                    value={form.firstName}
                    onChange={(v) => handleChange("firstName", v)}
                  />

                  <InputField
                    label="Last Name"
                    required={true}
                    value={form.lastName}
                    onChange={(v) => handleChange("lastName", v)}
                  />

                  {/* <DropdownWithSearch
                    label="Department"
                    required={true}
                    options={departmentOptions}
                    value={form.department}
                    onChange={(v) => handleChange("department", v)}
                  /> */}
                  <DropdownWithSearch
                    label="Department"
                    placeholder="Select department"
                    options={departmentOptions}
                    value={department}
                    onChange={(value) => {
                      setDepartment(value); // ✅ string
                      setSpecialist(""); // reset specialist
                    }}
                  />

                  {/* <DropdownWithSearch
                    label="Specialist"
                    required={true}
                    options={specialistOptions}
                    value={form.specialist}
                    onChange={(v) => handleChange("specialist", v)}
                  /> */}

                  {/* Specialist Dropdown */}
                  <DropdownWithSearch
                    label="Specialist"
                    placeholder={
                      department
                        ? "Select specialist"
                        : "Select department first"
                    }
                    options={specialistOptions}
                    value={specialist}
                    onChange={(value) => setSpecialist(value)}
                    disabled={!department}
                  />

                  <InputField
                    label="Fees ($)"
                    type="number"
                    required={true}
                    value={form.fees}
                    onChange={(v) => handleChange("fees", v)}
                  />

                  <InputField
                    label="Phone Number"
                    required={true}
                    value={form.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    required={true}
                    value={form.email}
                    onChange={(v) => handleChange("email", v)}
                  />

                  <InputField
                    label="DOB"
                    type="date"
                    required={true}
                    value={form.dob}
                    onChange={(v) => handleChange("dob", v)}
                  />

                  <DropdownWithSearch
                    label="Gender"
                    required={true}
                    options={genderOptions}
                    value={form.gender}
                    onChange={(v) => handleChange("gender", v)}
                  />

                  <InputField
                    label="Registration Number"
                    required={true}
                    value={form.registrationNo}
                    onChange={(v) => handleChange("registrationNo", v)}
                  />

                  <DropdownWithSearch
                    label="Known Languages"
                    required={true}
                    isMulti
                    options={languageOptions}
                    value={form.languages}
                    onChange={(v) => handleChange("languages", v)}
                  />
                </div>

                {/* ADDRESS */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Address Information</h3>

                  <UniversalTextArea
                    label="Address"
                    id="address"
                    name="address"
                    required={true}
                    row={3}
                    value={form.address}
                    placeholder="Enter complete address"
                    onChange={(v) => handleChange("address", v)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <InputField
                      label="Country"
                      value={form.country}
                      onChange={(v) => handleChange("country", v)}
                    />
                    <InputField
                      label="State"
                      value={form.state}
                      onChange={(v) => handleChange("state", v)}
                    />
                    <InputField
                      label="City"
                      value={form.city}
                      onChange={(v) => handleChange("city", v)}
                    />
                    <InputField
                      label="Pin Code"
                      value={form.pinCode}
                      onChange={(v) => handleChange("pinCode", v)}
                    />
                  </div>
                </div>

                {/* ACCOUNT */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Account Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Display Name"
                      value={form.displayName}
                      onChange={(v) => handleChange("displayName", v)}
                    />
                    <InputField
                      label="User Name"
                      value={form.username}
                      onChange={(v) => handleChange("username", v)}
                    />
                    <InputField
                      label="Password"
                      type="password"
                      value={form.password}
                      onChange={(v) => handleChange("password", v)}
                    />
                    <InputField
                      label="Confirm Password"
                      type="password"
                      value={form.confirmPassword}
                      onChange={(v) => handleChange("confirmPassword", v)}
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                  <UniversalButton
                    id="save-next-btn"
                    name="saveNext"
                    label="Save & Next"
                    variant="primary"
                    disabled={false}
                    isLoading={false}
                    onClick={() => {
                      handleSubmit();
                      setActiveTab("extra");
                    }}
                  />
                </div>
              </>
            )}

            {/* ================= EXTRA DETAILS ================= */}
            {activeTab === "extra" && (
              <div className="flex flex-col gap-6">
                {/* ================= EDUCATION ================= */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Educational Details</h3>

                  {education.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end"
                    >
                      {/* Institute */}
                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Institute Name"
                          required={true}
                          value={item.institute}
                          onChange={(v) =>
                            handleArrayChange(
                              setEducation,
                              index,
                              "institute",
                              v
                            )
                          }
                        />
                      </div>

                      {/* Qualification */}
                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Qualification"
                          required={true}
                          value={item.qualification}
                          onChange={(v) =>
                            handleArrayChange(
                              setEducation,
                              index,
                              "qualification",
                              v
                            )
                          }
                        />
                      </div>

                      {/* Year */}
                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-3"
                        }
                      >
                        <InputField
                          label="Year"
                          type="date"
                          required={true}
                          value={item.year}
                          onChange={(v) =>
                            handleArrayChange(setEducation, index, "year", v)
                          }
                        />
                      </div>

                      {/* Delete button only for index > 0 */}
                      {index !== 0 && (
                        <div className="md:col-span-1 flex justify-center">
                          <button
                            onClick={() =>
                              setEducation(
                                education.filter((_, i) => i !== index)
                              )
                            }
                            className="p-2 bg-red-500 text-white rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setEducation([
                        ...education,
                        { institute: "", qualification: "", year: "" },
                      ])
                    }
                    className="text-blue-600 text-sm font-medium"
                  >
                    + Add More
                  </button>
                </div>

                {/* ================= EXPERIENCE ================= */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Experience</h3>

                  {experience.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end"
                    >
                      <div className="md:col-span-6">
                        <InputField
                          label="Hospital / Clinic"
                          value={item.hospital}
                          onChange={(v) =>
                            handleArrayChange(
                              setExperience,
                              index,
                              "hospital",
                              v
                            )
                          }
                        />
                      </div>

                      <div className="md:col-span-6">
                        <InputField
                          label="Role"
                          value={item.role}
                          onChange={(v) =>
                            handleArrayChange(setExperience, index, "role", v)
                          }
                        />
                      </div>

                      <div className="md:col-span-6">
                        <InputField
                          label="From"
                          type="date"
                          value={item.from}
                          onChange={(v) =>
                            handleArrayChange(setExperience, index, "from", v)
                          }
                        />
                      </div>

                      <div className="md:col-span-5">
                        <InputField
                          label="To"
                          type="date"
                          value={item.to}
                          onChange={(v) =>
                            handleArrayChange(setExperience, index, "to", v)
                          }
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-center">
                        {index !== 0 && (
                          <button
                            onClick={() =>
                              setExperience(
                                experience.filter((_, i) => i !== index)
                              )
                            }
                            className="p-2 bg-red-500 text-white rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setExperience([
                        ...experience,
                        { hospital: "", role: "", from: "", to: "" },
                      ])
                    }
                    className="text-blue-600 text-sm font-medium"
                  >
                    + Add More
                  </button>
                </div>

                {/* ================= SOCIAL MEDIA ================= */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Social Media</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="Facebook"
                      value={socialMedia.facebook}
                      onChange={(v) =>
                        setSocialMedia((prev) => ({ ...prev, facebook: v }))
                      }
                    />
                    <InputField
                      label="Twitter"
                      value={socialMedia.twitter}
                      onChange={(v) =>
                        setSocialMedia((prev) => ({ ...prev, twitter: v }))
                      }
                    />
                    <InputField
                      label="LinkedIn"
                      value={socialMedia.linkedin}
                      onChange={(v) =>
                        setSocialMedia((prev) => ({ ...prev, linkedin: v }))
                      }
                    />
                  </div>
                </div>

                {/* ================= MEMBERSHIP ================= */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Membership</h3>

                  {membership.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end"
                    >
                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Organization"
                          value={item.organization}
                          onChange={(v) =>
                            handleArrayChange(
                              setMembership,
                              index,
                              "organization",
                              v
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Description"
                          value={item.description}
                          onChange={(v) =>
                            handleArrayChange(
                              setMembership,
                              index,
                              "description",
                              v
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-3"
                        }
                      >
                        <InputField
                          label="Year"
                          type="date"
                          value={item.year}
                          onChange={(v) =>
                            handleArrayChange(setMembership, index, "year", v)
                          }
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-center">
                        {index !== 0 && (
                          <button
                            onClick={() =>
                              setMembership(
                                membership.filter((_, i) => i !== index)
                              )
                            }
                            className="p-2 bg-red-500 text-white rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setMembership([
                        ...membership,
                        { organization: "", year: "", description: "" },
                      ])
                    }
                    className="text-blue-600 text-sm font-medium"
                  >
                    + Add More
                  </button>
                </div>

                {/* ================= AWARDS ================= */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Awards</h3>

                  {awards.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end"
                    >
                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Award Title"
                          value={item.title}
                          onChange={(v) =>
                            handleArrayChange(setAwards, index, "title", v)
                          }
                        />
                      </div>

                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-4"
                        }
                      >
                        <InputField
                          label="Description"
                          value={item.description}
                          onChange={(v) =>
                            handleArrayChange(
                              setAwards,
                              index,
                              "description",
                              v
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          index === 0 ? "md:col-span-4" : "md:col-span-3"
                        }
                      >
                        <InputField
                          label="Year"
                          type="date"
                          value={item.year}
                          onChange={(v) =>
                            handleArrayChange(setAwards, index, "year", v)
                          }
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-center">
                        {index !== 0 && (
                          <button
                            onClick={() =>
                              setAwards(awards.filter((_, i) => i !== index))
                            }
                            className="p-2 bg-red-500 text-white rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      setAwards([
                        ...awards,
                        { title: "", year: "", description: "" },
                      ])
                    }
                    className="text-blue-600 text-sm font-medium"
                  >
                    + Add More
                  </button>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="flex justify-end gap-3">
                  <UniversalButton
                    id="back-btn"
                    name="back"
                    label="Back"
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveTab("basic")}
                  />

                  <UniversalButton
                    id="submit-btn"
                    name="submit"
                    label="Submit"
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
