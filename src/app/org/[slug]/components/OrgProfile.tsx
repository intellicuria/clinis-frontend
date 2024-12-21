import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import { getOrg } from "@/lib/actions/BookingApiService";
import reducer, {
  getOrganizationDetails,
  useAppDispatch,
  useAppSelector,
} from "@/app/_appointment/store";
import { injectReducer } from "@/store";
injectReducer("AppointmentList", reducer);

interface OrganizationData {
  id: number;
  name: string;
  logo: string;
  description: string;
  email: string[];
  contact: string;
  website: string;
  rating: number;
  created_at: string;
  updated_at: string;
  owners: string[];
}

const OrganizationProfile = ({ username }: { username: string }) => {
  const organizationData = useAppSelector(
    (state) => state.AppointmentList.data.currentOrg
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        setLoading(true);
        // Use getOrg function to fetch the organization data
        dispatch(getOrganizationDetails(String(username)))
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
        // Log the fetched data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organization data");
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!organizationData) {
    return <p>No data available.</p>;
  }

  return (
    <div className="flex flex-col gap-5 mb-10 scrollbar-hide">
      {/* Profile Info */}
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-4">
          <img
            src={organizationData?.logo || "https://via.placeholder.com/100"}
            alt="Organization Logo"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {organizationData?.name || "N/A"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              {organizationData?.description || "Description not available"}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Contact: {organizationData?.contact || "N/A"}
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Email: {organizationData?.email?.join(", ") || "N/A"}
            </p>
            <div className="flex mt-2 space-x-2">
              <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm md:text-base font-semibold">
                {organizationData?.website
                  ? "VISIT WEBSITE"
                  : "Website Not Available"}
              </span>
            </div>
          </div>
        </div>
        <ButtonPrimary>Connect</ButtonPrimary>
      </div>

      {/* Rating */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">RATING</h2>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          {organizationData?.rating
            ? `${organizationData.rating} stars`
            : "Not Rated"}
        </p>
      </div>

      {/* Website */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">WEBSITE</h2>
        <a
          href={organizationData?.website || "#"}
          className="text-blue-500 text-sm md:text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          {organizationData?.website || "No Website Available"}
        </a>
      </div>

      {/* Created At & Updated At */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold text-lg md:text-xl">TIMELINE</h2>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          Created At: {new Date(organizationData?.created_at).toLocaleString()}
        </p>
        <p className="text-gray-700 mt-1 text-sm md:text-base">
          Updated At: {new Date(organizationData?.updated_at).toLocaleString()}
        </p>
      </div>

      {/* Owners */}
      {organizationData?.owners && organizationData.owners.length > 0 && (
        <div className="p-4 rounded-lg bg-white shadow">
          <h2 className="font-semibold text-lg md:text-xl">OWNERS</h2>
          <ul className="list-disc pl-5">
            {organizationData.owners.map((owner, index) => (
              <li key={index} className="text-gray-700 text-sm md:text-base">
                {owner}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrganizationProfile;
