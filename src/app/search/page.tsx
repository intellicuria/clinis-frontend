"use client";

import React, { useEffect, useState } from "react";
import Nav from "@/ui/Nav/Nav";
import NavItem from "@/ui/NavItem/NavItem";
import ArchiveFilterListBox from "@/ui/ArchiveFilterListBox/ArchiveFilterListBox";
import DoctorsCard from "@/components/home/DoctorsCard";
import OrganizationsCard from "@/components/home/OrganizationsCard";
import {
  searchDoctors,
  searchOrganization,
} from "@/lib/actions/SearchServices";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination/Pagination";
import ButtonCircle from "@/ui/Button/ButtonCircle";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Input from "@/ui/Input/Input";

const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];

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

const PageSearch = () => {
  const [doctorData, setDoctorData] = useState<DoctorData[]>([]);
  const [orgData, setOrgData] = useState<DoctorData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [doctorsPage, setDoctorsPage] = useState(1);
  const [doctorsTotalPages, setDoctorsTotalPages] = useState(1);

  const [orgPage, setOrgPage] = useState(1);
  const [orgTotalPages, setOrgTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const searchText = searchParams.get("text");
  const location = searchParams.get("location");

  const [searchTextValue, setSearchTextValue] = useState(searchText || "");

  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingOrganizations, setLoadingOrganizations] = useState(false);

  const [errorDoctors, setErrorDoctors] = useState(false);
  const [errorOrganizations, setErrorOrganizations] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async (page: number) => {
      if (!searchText?.trim()) return;
      
      setLoadingDoctors(true);
      setErrorDoctors(false);
      try {
        const doctorResponse = await searchDoctors<SearchResponse>(searchText, location, page, 10);

        if (doctorResponse.status && doctorResponse.data) {
          setDoctorData(doctorResponse.data.result);
          setDoctorsTotalPages(doctorResponse.data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
        setErrorDoctors(true);
      } finally {
        setLoadingDoctors(false);
        setIsSearching(false);
      }
    };

    fetchDoctorDetails(doctorsPage);
  }, [doctorsPage, searchText, location]);

  useEffect(() => {
    const fetchOrgDetails = async (page: number) => {
      if (!searchText?.trim()) return;

      setLoadingOrganizations(true);
      setErrorOrganizations(false);
      try {
        const orgResponse = await searchOrganization<SearchResponse>(searchText, location, page, 10);

        if (orgResponse.status && orgResponse.data) {
          setOrgData(orgResponse.data.result);
          setOrgTotalPages(orgResponse.data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch organization details", error);
        setErrorOrganizations(true);
      } finally {
        setLoadingOrganizations(false);
        setIsSearching(false);
      }
    };

    fetchOrgDetails(orgPage);
  }, [orgPage, searchText, location]);

  const handleDoctorsPageChange = (page: number) => {
    setDoctorsPage(page);
  };

  const handleOrganizationsPageChange = (page: number) => {
    setOrgPage(page);
  };

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTextValue.trim().length >= 3) {
        setIsSearching(true);
        router.push(
          `/search?text=${encodeURIComponent(
            searchTextValue.trim()
          )}&location=${location}`,
          { scroll: false }
        );
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTextValue]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTextValue.trim()) {
      router.push(
        `/search?text=${encodeURIComponent(
          searchTextValue.trim()
        )}&location=${location}`
      );
    }
  };
  return (
    <div className="nc-PageSearch bg-white dark:bg-neutral-900">
      {/* HEADER */}
      <div className="container py-10 lg:pb-28 space-y-16 lg:space-y-16 relative">
        <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-semibold">{searchText}</h2>
          <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
            We found{" "}
            <strong className="font-medium text-neutral-800 dark:text-neutral-100">
              {doctorData?.length + orgData?.length}
            </strong>{" "}
            results for{" "}
            <strong className="font-medium text-neutral-800 dark:text-neutral-100">
              {searchText}
            </strong>
          </span>
          <form
            className="relative w-full mt-8 text-left"
            onSubmit={handleFormSubmit}
          >
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                id="search-input"
                type="search"
                placeholder="Type and press enter"
                sizeClass="pl-14 py-5 pe-5 md:ps-16"
                value={searchTextValue}
                onChange={(e) => setSearchTextValue(e.target.value)}
                defaultValue={String(searchText)}
              />
              <ButtonCircle
                className="absolute end-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="submit"
              >
                <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
              </ButtonCircle>
              <span className="absolute start-5 top-1/2 transform -translate-y-1/2 text-2xl md:start-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                  ></path>
                </svg>
              </span>
            </label>
          </form>
        </header>
        <main className="space-y-16">
          {(loadingDoctors || loadingOrganizations || isSearching) ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : errorDoctors || errorOrganizations ? (
            <div className="text-center py-10 text-red-500">
              Something went wrong. Please try again later.
            </div>
          ) : doctorData.length === 0 && orgData.length === 0 ? (
            <div className="text-center py-10">
              No results found for "{searchText}".
            </div>
          ) : (
            <>
              {/* Doctors Section */}
              {doctorData.length > 0 && (
                <div className="space-y-10">
                  <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
                    <Nav
                      containerClassName="w-full overflow-x-auto hiddenScrollbar"
                      className="sm:space-x-2 rtl:space-x-reverse"
                    >
                      <NavItem isActive>Doctors</NavItem>
                    </Nav>
                    <div className="flex justify-end">
                      <ArchiveFilterListBox lists={FILTERS} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                    {doctorData.map((doctor, index) => (
                      <DoctorsCard key={index} doctor={doctor} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={doctorsPage}
                    totalPages={doctorsTotalPages}
                    onPageChange={handleDoctorsPageChange}
                  />
                </div>
              )}

              {/* Organizations Section */}
              {orgData.length > 0 && (
                <div className="space-y-10">
                  <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row mt-10">
                    <Nav
                      containerClassName="w-full overflow-x-auto hiddenScrollbar"
                      className="sm:space-x-2 rtl:space-x-reverse"
                    >
                      <NavItem isActive>Clinics</NavItem>
                    </Nav>
                    <div className="flex justify-end">
                      <ArchiveFilterListBox lists={FILTERS} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-8 mt-8 lg:mt-10">
                    {orgData.map((org, index) => (
                      <OrganizationsCard key={index} org={org} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={orgPage}
                    totalPages={orgTotalPages}
                    onPageChange={handleOrganizationsPageChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PageSearch;
