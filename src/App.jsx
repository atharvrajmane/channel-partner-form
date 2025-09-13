import React, { useState } from "react";

// Helper component for form fields to reduce repetition
const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-medium text-gray-600 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white disabled:bg-gray-50"
    />
  </div>
);

// Helper component for select/dropdown fields
const SelectField = ({ label, id, value, onChange, children }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-medium text-gray-600 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
    >
      {children}
    </select>
  </div>
);

// Helper component for file uploads
const FileUploadField = ({ label, id, className }) => (
  <div
    className={`flex flex-col items-center justify-center w-full h-20 p-2 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors ${className}`}
  >
    <label
      htmlFor={id}
      className="text-center text-xs text-gray-500 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {label}
      <input id={id} name={id} type="file" className="sr-only" />
    </label>
  </div>
);

// Helper for a simple view button
const ViewButton = () => (
  <div className="flex items-center justify-start h-full pt-5">
    <button
      type="button"
      className="w-full text-sm font-semibold text-[#4635FE] bg-white border border-[#4635FE] rounded-md px-4 py-1.5 hover:bg-indigo-50 transition-colors"
    >
      View
    </button>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    // Top Header
    applicationReferenceId: "",
    applicationDate: "",
    applicationRefBy: "",
    applicantClass: "",

    // Applicant Details
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    gender: "",
    aadharNumber: "",
    panCardNumber: "",
    mobileNumber: "",
    emailId: "",
    maritalStatus: "",
    spouseName: "",
    motherName: "",
    education: "",
    occupation: "",

    // Current Address
    currentAddress: "",
    currentPincode: "",
    currentState: "",
    currentDistrict: "",
    currentCity: "",
    currentLocality: "",
    currentLandmark: "",
    currentLatitude: "",
    currentLongitude: "",

    // Permanent Address
    permanentAddress: "",
    permanentPincode: "",
    permanentState: "",
    permanentDistrict: "",
    permanentCity: "",
    permanentLocality: "",
    permanentLandmark: "",
    permanentLatitude: "",
    permanentLongitude: "",

    // Banking Details
    bankName: "",
    accountHolderName: "",
    bankAccountNumber: "",
    ifscCode: "",
    branchName: "",
    accountType: "",

    // Final Decision
    anyReason: "",
    finalDecision: "",
    authSignature: "",
    digitalOTP: "",

    // KYC Document Numbers
    kycPanNumber: "",
    kycAadharNumber: "",
    kycElecBillNumber: "",
    kycShopActNumber: "", // Added this line for the new field

    // Authorized Person Details
    lgCode: "",
    lcCode: "",
    authPersonName: "",
    designation: "",
    employeeId: "",
    approvalDate: "",
  });

  const [sectionStatuses, setSectionStatuses] = useState({
    applicantDetails: null,
    currentAddress: null,
    permanentAddress: null,
    kycDocuments: null,
    bankingDetails: null,
  });

  const handleStatusChange = (section, status) => {
    setSectionStatuses((prevStatuses) => ({
      ...prevStatuses,
      [section]: prevStatuses[section] === status ? null : status,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const Section = ({ title, children, status, onStatusChange }) => {
    const approvedClasses =
      status === "approved"
        ? "bg-green-100 text-green-800 border-green-200"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    const rejectedClasses =
      status === "rejected"
        ? "bg-red-100 text-red-800 border-red-200"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";

    return (
      <section>
        <div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#4635FE]">{title}</h2>
          {onStatusChange && (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => onStatusChange("approved")}
                className={`px-4 py-1 text-xs font-semibold rounded-full border transition-colors duration-200 ${approvedClasses}`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => onStatusChange("rejected")}
                className={`px-4 py-1 text-xs font-semibold rounded-full border transition-colors duration-200 ${rejectedClasses}`}
              >
                Rejected
              </button>
            </div>
          )}
        </div>
        {children}
      </section>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4635FE] mb-10">
              Channel Partner Application Form
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mt-4">
              <FormField
                label="Application Reference Id"
                id="applicationReferenceId"
                value={formData.applicationReferenceId}
                onChange={handleChange}
              />
              <FormField
                label="Application Date"
                id="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={handleChange}
              />
              <FormField
                label="Application Ref By"
                id="applicationRefBy"
                value={formData.applicationRefBy}
                onChange={handleChange}
              />
              <FormField
                label="Applicant Class"
                id="applicantClass"
                value={formData.applicantClass}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-center ml-4 flex-shrink-0">
            <img
              src="https://placehold.co/100x100/E2E8F0/4A5568?text=Photo"
              alt="user name"
              className="rounded-md w-24 h-24 object-cover mx-auto border"
            />
            <p className="text-sm font-semibold mt-2">user name</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section
            title="1. Applicant Details"
            status={sectionStatuses.applicantDetails}
            onStatusChange={(status) =>
              handleStatusChange("applicantDetails", status)
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="lg:col-span-1">
                <FormField
                  label="First Name"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:col-span-1">
                <FormField
                  label="Middle Name"
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:col-span-1">
                <FormField
                  label="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Date of Birth"
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <FormField
                label="Age"
                id="age"
                value={formData.age}
                onChange={handleChange}
              />
              <FormField
                label="Gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              />
              <div className="lg:col-span-2">
                <FormField
                  label="Aadhar Number"
                  id="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:col-span-2">
                <FormField
                  label="PAN Card Number"
                  id="panCardNumber"
                  value={formData.panCardNumber}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Mobile Number"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <FormField
                label="Email ID"
                id="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange}
              />
              <FormField
                label="Marital Status"
                id="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              />
              <FormField
                label="Spouse Name"
                id="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
              />
              <FormField
                label="Mother Name"
                id="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              <FormField
                label="Education"
                id="education"
                value={formData.education}
                onChange={handleChange}
              />
              <FormField
                label="Occupation"
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>
          </Section>

          <Section
            title="2. Applicant Current Address"
            status={sectionStatuses.currentAddress}
            onStatusChange={(status) =>
              handleStatusChange("currentAddress", status)
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <FormField
                  label="Current Address"
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Pin Code"
                id="currentPincode"
                value={formData.currentPincode}
                onChange={handleChange}
              />
              <FormField
                label="State"
                id="currentState"
                value={formData.currentState}
                onChange={handleChange}
              />
              <FormField
                label="District"
                id="currentDistrict"
                value={formData.currentDistrict}
                onChange={handleChange}
              />
              <FormField
                label="City"
                id="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
              />
              <FormField
                label="Locality/Village"
                id="currentLocality"
                value={formData.currentLocality}
                onChange={handleChange}
              />
              <div className="lg:col-span-2">
                <FormField
                  label="Near Landmark"
                  id="currentLandmark"
                  value={formData.currentLandmark}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Latitude"
                id="currentLatitude"
                value={formData.currentLatitude}
                onChange={handleChange}
              />
              <FormField
                label="Longitude"
                id="currentLongitude"
                value={formData.currentLongitude}
                onChange={handleChange}
              />
            </div>
          </Section>

          <Section
            title="3. Applicant Permanent Address"
            status={sectionStatuses.permanentAddress}
            onStatusChange={(status) =>
              handleStatusChange("permanentAddress", status)
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <FormField
                  label="Permanent Address"
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Pin Code"
                id="permanentPincode"
                value={formData.permanentPincode}
                onChange={handleChange}
              />
              <FormField
                label="State"
                id="permanentState"
                value={formData.permanentState}
                onChange={handleChange}
              />
              <FormField
                label="District"
                id="permanentDistrict"
                value={formData.permanentDistrict}
                onChange={handleChange}
              />
              <FormField
                label="City"
                id="permanentCity"
                value={formData.permanentCity}
                onChange={handleChange}
              />
              <FormField
                label="Locality/Village"
                id="permanentLocality"
                value={formData.permanentLocality}
                onChange={handleChange}
              />
              <div className="lg:col-span-2">
                <FormField
                  label="Near Landmark"
                  id="permanentLandmark"
                  value={formData.permanentLandmark}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Latitude"
                id="permanentLatitude"
                value={formData.permanentLatitude}
                onChange={handleChange}
              />
              <FormField
                label="Longitude"
                id="permanentLongitude"
                value={formData.permanentLongitude}
                onChange={handleChange}
              />
            </div>
          </Section>

          <Section
            title="4. Applicant KYC Documents"
            status={sectionStatuses.kycDocuments}
            onStatusChange={(status) =>
              handleStatusChange("kycDocuments", status)
            }
          >
            <div className="space-y-2 border rounded-lg p-2">
              <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 px-2 py-1">
                <span>Applicant KYC Proof Type</span>
                <span>Document Type</span>
                <span>Document Number</span>
                <span>Front Side</span>
                <span>Back Side</span>
              </div>
              <div className="grid grid-cols-5 gap-4 items-center bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="text-sm font-semibold">Applicant PAN Card</p>
                </div>
                <div>
                  <p className="text-sm">ID Proof</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="kycPanNumber"
                    name="kycPanNumber"
                    value={formData.kycPanNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="PAN Number"
                  />
                </div>
                <FileUploadField label="Front" id="panFront" />
                <FileUploadField label="Back" id="panBack" />
              </div>
              <div className="grid grid-cols-5 gap-4 items-center bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="text-sm font-semibold">Applicant Aadhar Card</p>
                </div>
                <div>
                  <p className="text-sm">Address Card</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="kycAadharNumber"
                    name="kycAadharNumber"
                    value={formData.kycAadharNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Aadhar Number"
                  />
                </div>
                <FileUploadField label="Front" id="aadharFront" />
                <FileUploadField label="Back" id="aadharBack" />
              </div>
            </div>
            <div className="space-y-2 border rounded-lg p-2 mt-4">
              <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 px-2 py-1">
                <span>Applicant Address Proof</span>
                <span>Document Type</span>
                <span>Document Number</span>
                <span>Front Side</span>
                <span>Back Side</span>
              </div>
              <div className="grid grid-cols-5 gap-4 items-center bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="text-sm font-semibold">
                    Applicant Address Proof
                  </p>
                </div>
                <div>
                  <p className="text-sm">Electricity Bill</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="kycElecBillNumber"
                    name="kycElecBillNumber"
                    value={formData.kycElecBillNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Bill Number"
                  />
                </div>
                <FileUploadField label="Front" id="elecBillFront" />
                <FileUploadField label="Back" id="elecBillBack" />
              </div>
            </div>

            {/* ----- START: ADDED SECTION ----- */}
            <div className="space-y-2 border rounded-lg p-2 mt-4">
              <div className="grid grid-cols-5 gap-4 text-xs font-semibold text-gray-500 px-2 py-1">
                <span>Applicant have firm documents</span>
                <span>Document Type</span>
                <span>Document Number</span>
                <span>Front Side</span>
                <span>Back Side</span>
              </div>
              <div className="grid grid-cols-5 gap-4 items-center bg-gray-50 p-2 rounded-md">
                <div>
                  <p className="text-sm font-semibold">
                    Applicant firm documents
                  </p>
                </div>
                <div>
                  <p className="text-sm">Shop Act</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="kycShopActNumber"
                    name="kycShopActNumber"
                    value={formData.kycShopActNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Document Number"
                  />
                </div>
                <FileUploadField label="Front" id="shopActFront" />
                <FileUploadField label="Back" id="shopActBack" />
              </div>
            </div>
            {/* ----- END: ADDED SECTION ----- */}
          </Section>

          <Section
            title="5. Applicant Banking Details"
            status={sectionStatuses.bankingDetails}
            onStatusChange={(status) =>
              handleStatusChange("bankingDetails", status)
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
              <FormField
                label="Bank Name"
                id="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />
              <FormField
                label="Account Holder Name"
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Bank Account Number"
                  id="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="IFSC Code"
                id="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
              />
              <FormField
                label="Branch Name"
                id="branchName"
                value={formData.branchName}
                onChange={handleChange}
              />
              <FormField
                label="Type of Bank Account"
                id="accountType"
                value={formData.accountType}
                onChange={handleChange}
              />
              <ViewButton />
            </div>
          </Section>

          <Section title="6. Final Authority Decision (Official Use Only)">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <SelectField
                  label="Any Reason"
                  id="anyReason"
                  value={formData.anyReason}
                  onChange={handleChange}
                >
                  <option value="">Enter Reason</option>
                  <option value="incomplete_docs">Incomplete Documents</option>
                  <option value="failed_verification">
                    Failed Verification
                  </option>
                  <option value="other">Other</option>
                </SelectField>
                <SelectField
                  label="Final Decision"
                  id="finalDecision"
                  value={formData.finalDecision}
                  onChange={handleChange}
                >
                  <option value="">Select Decision</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </SelectField>
                <SelectField
                  label="Authorized Person Signature"
                  id="authSignature"
                  value={formData.authSignature}
                  onChange={handleChange}
                >
                  <option value="">Select Signature Type</option>
                  <option value="digital">
                    Digital Signature for Decision
                  </option>
                  <option value="manual">Manual Signature</option>
                </SelectField>
                <FormField
                  label="Digital OTP"
                  id="digitalOTP"
                  value={formData.digitalOTP}
                  onChange={handleChange}
                  placeholder="Enter Valid OTP"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-[#4635FE] text-white font-semibold px-8 py-2.5 rounded-md hover:bg-indigo-700"
                >
                  Update Decision
                </button>
              </div>
            </div>
          </Section>

          <Section title="7. Authorized Person Details (Internal Use Only)">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
              <FormField
                label="LG Code"
                id="lgCode"
                value={formData.lgCode}
                onChange={handleChange}
              />
              <FormField
                label="LC Code"
                id="lcCode"
                value={formData.lcCode}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Name of Authorized Approval Person"
                  id="authPersonName"
                  value={formData.authPersonName}
                  onChange={handleChange}
                />
              </div>
              <FormField
                label="Designation"
                id="designation"
                value={formData.designation}
                onChange={handleChange}
              />
              <FormField
                label="Employee ID"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />
              <FormField
                label="Approval Date"
                id="approvalDate"
                type="date"
                value={formData.approvalDate}
                onChange={handleChange}
              />
              <ViewButton />
            </div>
          </Section>
        </form>
      </div>
    </div>
  );
}
