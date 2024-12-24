"use client";

import React, { useEffect, useState } from "react";
import { getAllDoctor } from "@/lib/actions/BookingApiService";
import Pagination from "@/ui/Pagination/Pagination";
import Input from "@/ui/Input/Input";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import DoctorsCard from "@/components/home/DoctorsCard";

interface DoctorData {
  id: number;
  name: string;
  experience_year: number;
  languages_spoken: string[];
  registrationId: string;
  about_youself: string;
  speciality: string[];
  education: Array<{
    title: string;
    description: string;
    year: string;
    college: string;
  }>;
  experience: Array<{
    title: string;
    organization: string;
    description: string;
    year: string;
  }>;
  awards: Array<{
    title: string;
    description: string;
    year: string;
  }>;
  image: string;
  consultation_fee: number;
  gender: string;
  designation: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await getAllDoctor<{ status: boolean; data: DoctorData[] }>();
        if (response.status) {
          setDoctors(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search doctors by name or speciality..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg mx-auto"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorsCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No doctors found matching your search.
            </p>
          )}
        </div>
      )}
      <div className="mt-12 flex justify-center">
        <Pagination />
      </div>
      <div className="mt-6 flex justify-center">
        <ButtonPrimary>Show More</ButtonPrimary>
      </div>
    </div>
  );
}
