"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Link from "next/link";
import Calendar from "@/ui/Calendar/Calendar";
import { useAppSelector } from "@/store";
import Skeleton from "@/ui/Skeleton/Skeleton";
import { getPatientProfile } from "@/lib/actions/PatientService";
import MedicalRecordsTab from "./components/MedicalRecordsTab";
import AppointmentsTab from "./components/AppointmentsTab";

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
  const userId = useAppSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (!userId) return;
    fetchProfileData(userId);
  }, [userId]);

  const fetchProfileData = async (userId: any) => {
    try {
      setLoading(true);
      const response = await getPatientProfile(userId);
      if (response?.status) {
        const profileData = response.data;
        setProfile({
          id: profileData.id,
          fullname: profileData.fullname || "",
          email: profileData.email || "",
          phone_number: profileData.phone_number || "",
          gender: profileData.gender || "",
          age: profileData.age || 0,
          profile_image: profileData.profile_image || "/images/avatar.svg",
          medical_history: profileData.medical_history || [],
          allergies: profileData.allergies || [],
          height: profileData.height || 0,
          weight: profileData.weight || 0,
          blood_group: profileData.blood_group || "",
        });
      } else {
        console.error("Error fetching profile");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="text-lg font-medium">{profile?.age} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-lg font-medium">{profile?.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="text-lg font-medium">{profile?.blood_group}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Height/Weight</p>
            <p className="text-lg font-medium">
              {profile?.height} cm / {profile?.weight} kg
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Medical History</h3>
        {profile?.medical_history && profile.medical_history.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {profile.medical_history.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No medical history available</p>
        )}
      </section>

      <section className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Allergies</h3>
        {profile?.allergies && profile.allergies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No allergies recorded</p>
        )}
      </section>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Profile Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center gap-8">
          <div className="relative w-28 h-28">
            <Image
              src={profile?.profile_image || "/images/avatar.svg"}
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{profile?.fullname}</h1>
            <p className="text-sm opacity-80">ID: {profile?.id}</p>
          </div>
          <Link href="/profile/edit">
            <ButtonPrimary>Edit Profile</ButtonPrimary>
          </Link>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex gap-4 mb-8">
        {[
          { id: "overview", label: "Overview" },
          { id: "records", label: "Medical Records" },
          { id: "appointments", label: "Appointments" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content Section */}
      <section className="bg-gray-50 p-6 rounded-xl shadow-md">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === "overview" ? (
          renderOverview()
        ) : activeTab === "records" ? (
          <MedicalRecordsTab />
        ) : (
          <AppointmentsTab />
        )}
      </section>
    </div>
  );
}
