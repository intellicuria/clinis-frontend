
"use client";

import React, { useEffect, useState } from "react";
import { getAllDoctors } from "@/lib/actions/DoctorService";
import Pagination from "@/ui/Pagination/Pagination";
import Input from "@/ui/Input/Input";
import Badge from "@/ui/Badge/Badge";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Link from "next/link";

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
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        setDoctors(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={doctor.image || "/images/avatar.svg"}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{doctor.name}</h3>
                <p className="text-white/80">{doctor.designation}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {doctor.speciality.map((spec, index) => (
                  <Badge key={index} name={spec} />
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm">
                  <span className="font-medium">Experience:</span> {doctor.experience_year} years
                </p>
                <p className="text-sm">
                  <span className="font-medium">Languages:</span>{" "}
                  {doctor.languages_spoken.join(", ")}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Consultation Fee:</span> ₹
                  {doctor.consultation_fee}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Education</h4>
                <div className="space-y-1">
                  {doctor.education.map((edu, index) => (
                    <p key={index} className="text-sm">
                      {edu.title} - {edu.college} ({edu.year})
                    </p>
                  ))}
                </div>
              </div>

              <Link href={`/doctor/${doctor.id}`}>
                <ButtonPrimary className="w-full">View Profile</ButtonPrimary>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length > doctorsPerPage && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={Math.ceil(filteredDoctors.length / doctorsPerPage)}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No doctors found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
