import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import { getDoctor } from "@/lib/actions/BookingApiService";
import { injectReducer } from "@/store";
import reducer, {
  getDoctorDetails,
  useAppDispatch,
  useAppSelector,
} from "@/app/_appointment/store";

injectReducer("AppointmentList", reducer);

interface DoctorProfileProps {
  username: string | null; // Doctor ID passed from the parent component
  doctor: any;
  setDoctorData: any;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ username }) => {
  const dispatch = useAppDispatch();
  const doctor = useAppSelector(
    (state) => state.AppointmentList.data.currentDoctor
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch doctor details using the provided `getDoctor` function
    const fetchDoctorDetails = async () => {
      setLoading(true);
      dispatch(getDoctorDetails(String(username)))
        .unwrap()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchDoctorDetails();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 mb-10 scrollbar-hide">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full md:w-auto">
          <img
            src={doctor.image || "https://via.placeholder.com/100"}
            alt={doctor.name || "Doctor"}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {doctor.name || "N/A"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {doctor.designation || "Designation not available"}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Registration No: {doctor.registrationId || "N/A"}
            </p>
          </div>
        </div>
        <ButtonPrimary>Connect </ButtonPrimary>
      </div>

      {/* Experience & Languages */}
      <div className="p-4 rounded-lg bg-white shadow">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-2xl">🎓</span>
          <div>
            <p className="font-semibold text-sm md:text-base">
              {doctor.experience_year || 0} Yrs
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              Overall Experience
            </p>
          </div>
          <span className="ml-6 text-2xl">🌐</span>
          <div>
            <p className="font-semibold text-sm md:text-base">
              {doctor.languages_spoken.length > 0
                ? doctor.languages_spoken.join(", ")
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
          {doctor.about_youself || "No details provided"}
        </p>
      </div>

      {/* Specializations */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">SPECIALISATIONS</h2>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          {doctor.speciality.length > 0
            ? doctor.speciality.join(", ")
            : "No specializations available"}
        </p>
      </div>

      {/* Educational Qualifications */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">
          EDUCATIONAL QUALIFICATIONS
        </h2>
        <p className="mt-1 text-gray-700 text-sm md:text-base">
          {doctor.education.length > 0
            ? doctor.education.join(", ")
            : "No education details provided"}
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
