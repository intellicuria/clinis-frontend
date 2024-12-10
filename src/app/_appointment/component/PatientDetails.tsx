import React, { useState, ChangeEvent } from "react";
import Input from "@/ui/Input/Input";
import Select from "@/ui/Select/Select";
import Button from "@/ui/Button/Button";
import { RadioGroup } from "@headlessui/react";
import AppointmentConfirmation from "./AppointmentConfirmation";

const PatientDetails: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    dob: { day: "", month: "", year: "" },
    gender: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleDobChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      dob: { ...prev.dob, [field]: value },
    }));
  };

  const handleSubmit = () => {
    const { name, age, dob, gender } = formState;
    const newErrors: string[] = [];

    // Basic validation
    if (!name) newErrors.push("Full Name is required.");
    if (!age && (!dob.day || !dob.month || !dob.year)) {
      newErrors.push("Please provide either Age or complete Date of Birth.");
    }
    if (!gender) newErrors.push("Gender is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show confirmation page
    setShowConfirmation(true);
  };

  // Render AppointmentConfirmation component if form is submitted
  if (showConfirmation) {
    return <AppointmentConfirmation PatientDetails={formState} />;
  }

  return (
    <div className="mx-auto p-5 rounded-lg">
      <h1 className="text-2xl font-semibold">In-Clinic Consultation</h1>
      <p className="text-sm text-gray-500 mb-5">
        Samarpan Neuropsychiatry Clinic, 202, Rudra Business Park, Opp. Kashinath Park,...
      </p>

      <h2 className="text-lg font-semibold mb-4">Patient Info</h2>
      
      {/* Display errors */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm mb-2">Full Name</p>
        <Input
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          placeholder="Enter full name"
          className="rounded-md p-2 border border-gray-300"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">Age</p>
        <Input
          value={formState.age}
          onChange={(e) => setFormState({ ...formState, age: e.target.value })}
          placeholder="Enter age"
          className="rounded-md p-2 border border-gray-300"
        />
      </div>

      <p className="text-center my-4">OR</p>

      <div className="flex gap-4 mb-4">
        <Select
          value={formState.dob.day}
          onChange={(e) => handleDobChange("day", e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Select
          value={formState.dob.month}
          onChange={(e) => handleDobChange("month", e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Select
          value={formState.dob.year}
          onChange={(e) => handleDobChange("year", e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {Array.from({ length: 120 }, (_, i) => (
            <option key={i} value={2024 - i}>
              {2024 - i}
            </option>
          ))}
        </Select>
      </div>

      <h2 className="text-lg font-semibold mb-2">Gender</h2>
      <RadioGroup
        value={formState.gender}
        onChange={(value) => setFormState({ ...formState, gender: value })}
      >
        <div className="flex gap-4 mb-4">
          <RadioGroup.Option value="Male">
            {({ checked }) => (
              <div
                className={`p-2 px-4 rounded-md ${
                  checked ? "bg-primary-500 text-white" : "bg-gray-200"
                }`}
              >
                Male
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="Female">
            {({ checked }) => (
              <div
                className={`p-2 px-4 rounded-md ${
                  checked ? "bg-primary-500 text-white" : "bg-gray-200"
                }`}
              >
                Female
              </div>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>

      <Button className="w-full mt-4 rounded-md" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default PatientDetails;
