"use client";

import React, { useState, useEffect } from "react";
import Button from "@/ui/Button/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { getOrgWorkspaces } from "@/lib/actions/BookingApiService";

export default function Appointment({
  setShowSlots,
  doctorId,
  organizationId,
}: {
  setShowSlots: (value: boolean) => void;
  doctorId: string;
  organizationId: string;
}) {
  const [isOpenWorkspace, setIsOpenWorkspace] = useState(false);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>({
    label: "– select workspace –",
    description: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState<any>({
    label: "– select doctor –",
    description: "",
  });
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [timeSlots] = useState(["05:30 PM", "05:45 PM", "06:00 PM"]); // Sample time slots

  // Fetch workspaces and doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workspacesResponse, doctorsResponse] = await Promise.all([
          getOrgWorkspaces(organizationId), // Fetch workspaces for specific organization
          getDoctors(),
        ]);
        if (workspacesResponse?.status) {
          setWorkspaces(workspacesResponse.data);
        } else {
          console.error(
            "Error fetching workspaces:",
            workspacesResponse?.message
          );
        }
        if (doctorsResponse?.status) {
          setDoctors(doctorsResponse.data);
        } else {
          console.error("Error fetching doctors:", doctorsResponse?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId]);

  const toggleDropdown = (type: "workspace" | "doctor") => {
    if (type === "workspace") {
      setIsOpenWorkspace(!isOpenWorkspace);
    } else if (type === "doctor") {
      setIsOpenDoctor(!isOpenDoctor);
    }
  };

  const handleOptionClick = (type: "workspace" | "doctor", option: any) => {
    if (type === "workspace") {
      setSelectedWorkspace(option);
      setIsOpenWorkspace(false);
      // Reset the doctor selection when a new workspace is selected
      setSelectedDoctor({
        label: "– select doctor –",
        description: "",
      });
    } else if (type === "doctor") {
      setSelectedDoctor(option);
      setIsOpenDoctor(false);
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="mx-auto p-5 rounded-lg">
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl mb-5 font-semibold">Book an appointment</h1>
        <Button pattern="primary" className="rounded-xl">
          In-clinic
        </Button>
      </div>

      {/* Workspace Dropdown */}
      <div className="relative mt-4">
        <div
          className="p-2 px-3 border border-primary-300 text-primary-600 rounded-lg flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => toggleDropdown("workspace")}
        >
          <div>
            <span className="font-semibold">{selectedWorkspace.label}</span>
            {selectedWorkspace.description && (
              <p className="text-sm text-primary-500 mt-1 line-clamp-1">
                {selectedWorkspace.description}
              </p>
            )}
          </div>
          {isOpenWorkspace ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {isOpenWorkspace && (
          <div className="absolute top-full mt-1 max-h-[50vh] overflow-y-auto w-full bg-white border overflow-hidden border-gray-300 rounded-lg shadow-lg z-10">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="p-2 cursor-pointer hover:bg-primary-100"
                onClick={() =>
                  handleOptionClick("workspace", {
                    label: workspace.name,
                    description: workspace.about,
                  })
                }
              >
                <span className="font-semibold">{workspace.name}</span>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {workspace.about}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Dropdown - Only visible if a workspace is selected */}
      {selectedWorkspace.label !== "– select workspace –" && (
        <div className="relative mt-4">
          <div
            className="p-2 px-3 border border-primary-300 text-primary-600 rounded-lg flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={() => toggleDropdown("doctor")}
          >
            <div>
              <span className="font-semibold">{selectedDoctor.label}</span>
              {selectedDoctor.description && (
                <p className="text-sm text-primary-500 mt-1 line-clamp-1">
                  {selectedDoctor.description}
                </p>
              )}
            </div>
            {isOpenDoctor ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </div>

          {isOpenDoctor && (
            <div className="absolute top-full mt-1 max-h-[50vh] overflow-y-auto w-full bg-white border overflow-hidden border-gray-300 rounded-lg shadow-lg z-10">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-2 cursor-pointer hover:bg-primary-100"
                  onClick={() =>
                    handleOptionClick("doctor", {
                      label: doctor.name,
                      description: doctor.specialization,
                    })
                  }
                >
                  <span className="font-semibold">{doctor.name}</span>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {doctor.specialization}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Time slots display */}
      <div className="mt-6 p-3 rounded-md bg-primary-50">
        <h1 className="text-sm">Select Service</h1>
        <div className="mt-2 p-4 border flex flex-col gap-4 rounded-lg bg-white">
          <h2 className="text-xs font-medium text-green-600">
            SLOTS AVAILABLE 08 NOV '24, TODAY
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {timeSlots.map((time, index) => (
              <Button
                sizeClass="!text-base px-2 py-2"
                key={index}
                pattern="twoTone"
                className="rounded-sm"
              >
                {time}
              </Button>
            ))}
          </div>
          <Button
            pattern="primary"
            className="w-full rounded-lg"
            onClick={() => setShowSlots(true)}
            sizeClass="py-2 !text-sm"
          >
            See all slots
          </Button>
        </div>
      </div>
    </div>
  );
}
