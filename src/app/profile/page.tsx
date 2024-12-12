
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import ButtonSecondary from "@/ui/Button/ButtonSecondary";
import Calendar from "@/ui/Calendar/Calendar";
import { useAppSelector } from "@/store";
import Skeleton from "@/ui/Skeleton/Skeleton";
import toast from 'react-hot-toast';
import { getPatientProfile, getPatientRecords } from "@/lib/actions/PatientService";

interface PatientProfile {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
  profile_image: string;
  medical_history: string[];
  allergies: string[];
  height: number;
  weight: number;
  blood_group: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to view profile");
        return;
      }
      const response = await getPatientProfile(token);
      if (response?.data?.status) {
        setProfile(response.data.data);
      } else {
        toast.error(response?.data?.message || "Failed to fetch profile data");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast.error(error?.response?.data?.message || "Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const renderShimmer = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Age</p>
            <p className="font-medium">{profile?.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gender</p>
            <p className="font-medium">{profile?.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Blood Group</p>
            <p className="font-medium">{profile?.blood_group}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Height/Weight</p>
            <p className="font-medium">{profile?.height}cm / {profile?.weight}kg</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Medical History</h3>
        {profile?.medical_history && profile.medical_history.length > 0 ? (
          <ul className="list-disc pl-5">
            {profile.medical_history.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No medical history available</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Allergies</h3>
        <div className="flex flex-wrap gap-2">
          {profile?.allergies && profile.allergies.length > 0 ? (
            profile.allergies.map((allergy, index) => (
              <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {allergy}
              </span>
            ))
          ) : (
            <p className="text-gray-500 italic">No allergies recorded</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24">
            <Image
              src={profile?.profile_image || "/images/avatar.svg"}
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold">{profile?.fullname}</h1>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                ID: {profile?.id}
              </span>
            </div>
            <div className="flex gap-3">
              <ButtonPrimary onClick={() => window.location.href = '/profile/edit'}>
                Edit Profile
              </ButtonPrimary>
              <ButtonSecondary>Download Records</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "overview", label: "Overview" },
          { id: "appointments", label: "Appointments" },
          { id: "records", label: "Medical Records" },
          { id: "prescriptions", label: "Prescriptions" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        {loading ? renderShimmer() : renderOverview()}
      </div>
    </div>
  );
}
