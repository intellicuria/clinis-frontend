import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import { getDoctor } from "@/lib/actions/BookingApiService";
interface DoctorProfileProps {
  username: string | null; // Doctor ID passed from the parent component
  doctorData: any;
  setDoctorData: any;
}

// Define the API response structure
interface DoctorData {
  name: string;
  experience_year: number;
  languages_spoken: string[];
  registrationId: string;
  about_youself: string;
  speciality: string[];
  education: string[];
  experience: any[];
  awards: any[];
  image: string;
  consultation_fee: number;
  gender: string;
  designation: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  username,
  doctorData,
  setDoctorData,
}) => {
  useEffect(() => {
    // Fetch doctor details using the provided `getDoctor` function
    const fetchDoctorDetails = async () => {
      try {
        const response = await getDoctor<{ status: boolean; data: DoctorData }>(
          username
        );
        if (response.status) {
          setDoctorData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctorDetails();
  }, [username]);

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 mb-10 scrollbar-hide">
      {/* Profile Info */}
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
          <img
            src={doctorData.image || "https://via.placeholder.com/100"}
            alt={doctorData.name || "Doctor"}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {doctorData.name || "N/A"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {doctorData.designation || "Designation not available"}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Registration No: {doctorData.registrationId || "N/A"}
            </p>
          </div>
        </div>
        <ButtonPrimary>Connect </ButtonPrimary>
      </div>

      {/* Experience & Languages */}
      <div className="p-4 rounded-lg bg-white shadow">
        <div className="flex items-center gap-4">
          <span className="text-2xl">🎓</span>
          <div>
            <p className="font-semibold text-sm md:text-base">
              {doctorData.experience_year || 0} Yrs
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              Overall Experience
            </p>
          </div>
          <span className="ml-6 text-2xl">🌐</span>
          <div>
            <p className="font-semibold text-sm md:text-base">
              {doctorData.languages_spoken.length > 0
                ? doctorData.languages_spoken.join(", ")
                : "N/A"}
            </p>
            <p className="text-gray-600 text-xs md:text-sm">Languages</p>
          </div>
        </div>
      </div>

      {/* About the Doctor */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">ABOUT THE DOCTOR</h2>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          {doctorData.about_youself || "No details provided"}
        </p>
      </div>

      {/* Specializations */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">SPECIALISATIONS</h2>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          {doctorData.speciality.length > 0
            ? doctorData.speciality.join(", ")
            : "No specializations available"}
        </p>
      </div>

      {/* Educational Qualifications */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">
          EDUCATIONAL QUALIFICATIONS
        </h2>
        <p className="mt-1 text-gray-700 text-sm md:text-base">
          {doctorData.education.length > 0
            ? doctorData.education.join(", ")
            : "No education details provided"}
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
