"use client";

import React, { useEffect, useState } from "react";
import { getAllOrganizations } from "@/lib/actions/BookingApiService";
import Pagination from "@/ui/Pagination/Pagination";
import Input from "@/ui/Input/Input";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import OrganizationsCard from "@/components/home/OrganizationsCard";

interface OrganizationData {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  services: string[];
  image: string;
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await getAllOrganizations<{ status: boolean; data: OrganizationData[] }>();
        if (response.status) {
          setOrganizations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch organizations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search organizations by name or services..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-lg mx-auto"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5 md:gap-8">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((organization) => (
              <OrganizationsCard key={organization.id} org={organization} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No organizations found matching your search.
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
