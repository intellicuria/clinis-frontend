"use client";

import React, { useState, useEffect } from "react";
import Button from "@/ui/Button/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { getWorkspaces, getSlots } from "@/lib/actions/BookingApiService";

export default function Appointment({
  setShowSlots,
  username,
  setWorkspaces,
  workspaces,
  doctorData,
  setSelectedOption,
  selectedOption,
  selectedSlot,
  setSelectedSlot,
  navigateToBookAppointment,
}: {
  setShowSlots: (value: boolean) => void;
  username: string;
  setWorkspaces: any;
  workspaces: any;
  doctorData: any;
  setSelectedOption: any;
  selectedOption: any;
  selectedSlot: any;
  setSelectedSlot: any;
  navigateToBookAppointment: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await getWorkspaces(username);
        if (response?.status) {
          setWorkspaces(response.data);
        } else {
          console.error("Error fetching workspaces:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, [username]);
  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!doctorData.id) {
        return;
      }

      const today = new Date();
      const isoDate = today.toISOString().split("T")[0] + "T00:00:00.000Z";

      try {
        setLoadingSlots(true);
        const body = { date: isoDate };
        const response = await getSlots(
          doctorData.id,
          selectedOption.value,
          body
        );
        console.log(response);
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setLoadingSlots(false);
        // Perform cleanup if needed
      }
    };

    fetchWorkspaces();
  }, [doctorData, selectedOption]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    console.log(option);
    setIsOpen(false);
  };

  if (loading) {
    return <div>Loading workspaces...</div>;
  }

  return (
    <div className="mx-auto p-5 rounded-lg">
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl mb-5 font-semibold">Book an appointment</h1>
        <Button pattern="primary" className="rounded-xl">
          In-clinic
        </Button>
      </div>

      <div className="relative mt-4">
        <div
          className="p-2 px-3 border border-primary-300 text-primary-600 rounded-lg flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={toggleDropdown}
        >
          <div>
            <span className="font-semibold">{selectedOption.label}</span>
            {selectedOption.description && (
              <p className="text-sm text-primary-500 mt-1 line-clamp-1">
                {selectedOption.description}
              </p>
            )}
          </div>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {isOpen && (
          <div className="absolute top-full mt-1 max-h-[50vh] overflow-y-auto w-full bg-white border overflow-hidden border-gray-300 rounded-lg shadow-lg z-10">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="p-2 cursor-pointer hover:bg-primary-100"
                onClick={() =>
                  handleOptionClick({
                    label: workspace.name,
                    description: workspace.about,
                    value: workspace?.id,
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

      {/* Time slots display */}
      {loadingSlots ? (
        <div>Loading slots...</div>
      ) : slots.length > 0 ? (
        <div className="mt-6 p-3 rounded-md bg-primary-50">
          <h1 className="text-sm">Select Service</h1>
          <div className="mt-2 p-4 border flex flex-col gap-4 rounded-lg bg-white">
            <h2 className="text-xs font-medium text-green-600">
              SLOTS AVAILABLE{" "}
              {new Date()
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .toUpperCase()}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {slots.map((slot) => (
                <Button
                  sizeClass="!text-base px-2 py-2"
                  key={slot.id}
                  pattern={selectedSlot.id === slot.id ? "primary" : "twoTone"}
                  className="rounded-sm"
                  onClick={() => {
                    setSelectedSlot(slot);
                    navigateToBookAppointment(true);
                  }}
                >
                  {`${slot.from} `}
                </Button>
              ))}
            </div>
            {/* {selectedSlot.id && (
              <Button
                pattern="primary"
                className="w-full rounded-lg"
                onClick={() => setShowSlots(true)}
                sizeClass="py-2 !text-sm"
              >
                Continue
              </Button>
            )} */}
            <Button
              pattern={selectedSlot.id ? "twoTone" : "primary"}
              className="w-full rounded-lg"
              onClick={() => setShowSlots(true)}
              sizeClass="py-2 !text-sm"
            >
              See all slots
            </Button>
          </div>
        </div>
      ) : (
        <div>No slots available for today.</div>
      )}
    </div>
  );
}
