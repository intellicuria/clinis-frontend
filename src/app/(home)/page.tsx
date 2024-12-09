"use client";

import React, { useEffect, useState } from "react";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import Pagination from "@/ui/Pagination/Pagination";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Nav from "@/ui/Nav/Nav";
import NavItem from "@/ui/NavItem/NavItem";
import ArchiveFilterListBox from "@/ui/ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "@/ui/Input/Input";
import NcImage from "@/ui/NcImage/NcImage";
import DoctorsCard from "@/components/home/DoctorsCard";
import ButtonCircle from "@/ui/Button/ButtonCircle";
import OrganizationsCard from "@/components/home/OrganizationsCard";
import Tag from "@/ui/Tag/Tag";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  getAllDoctor,
  getAllOrganizations,
} from "@/lib/actions/BookingApiService";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

const tags = DEMO_CATEGORIES.filter((_, i) => i < 32);

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
const TABS = ["Doctors", "Clinics", "Specialization"];

const PageSearch = ({}) => {
  const { location } = useAppSelector((state) => state.auth.user);

  const [tabActive, setTabActive] = useState(TABS[0]);

  const router = useRouter();
  const [searchTextValue, setSearchTextValue] = useState("");

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const [doctorData, setDoctorData] = useState<DoctorData[] | null>(null);
  const [orgData, setOrgData] = useState<DoctorData[] | null>(null);

  useEffect(() => {
    // Fetch doctor details using the provided `getDoctor` function
    const fetchDoctorDetails = async () => {
      try {
        const doctor = await getAllDoctor<{
          status: boolean;
          data: DoctorData;
        }>();
        const org = await getAllOrganizations<{
          status: boolean;
          data: DoctorData;
        }>();
        if (doctor.status) {
          setDoctorData(doctor.data);
        }
        if (org.status) {
          setOrgData(org.data);
        }
        console.log(org);
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
    if (searchTextValue.trim()) {
      router.push(
        `/search?text=${encodeURIComponent(
          searchTextValue.trim()
        )}&location=${location}`
      );
    }
  };
  return (
    <div className={`nc-PageSearch`}>
      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-9 lg:aspect-h-5 overflow-hidden z-0">
          <NcImage
            alt="search"
            fill
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
        </div>
        {/* CONTENT */}
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16  rounded-2xl md:rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
              <h3 className="text-xl md:text-3xl text-gray-600 font-semibold">
                Search Doctors and Clinics
              </h3>
              <form
                className=" w-full flex md:flex-row flex-col items-center justify-center gap-3 mt-2 md:mt-8 text-left"
                onSubmit={handleFormSubmit}
              >
                <div className="relative w-full md:w-2/3">
                  <label
                    htmlFor="search-input"
                    className="text-neutral-500 dark:text-neutral-300"
                  >
                    <span className="sr-only">Search all icons</span>
                    <Input
                      id="search-input"
                      type="search"
                      placeholder="Type and press enter"
                      sizeClass="pl-14 py-4 pe-5 md:ps-16"
                      value={searchTextValue}
                      onChange={(e) => setSearchTextValue(e.target.value)}
                      defaultValue={""}
                    />
                    <ButtonCircle
                      className="absolute end-2.5 top-1/2 transform -translate-y-1/2"
                      size=" w-11 h-11"
                      type="submit"
                    >
                      <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
                    </ButtonCircle>
                    <span className="absolute start-5 top-1/2 transform -translate-y-1/2 text-2xl md:start-6">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
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
                </div>
              </form>
            </header>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar"
              className="sm:space-x-2 rtl:space-x-reverse"
            >
              {TABS.map((item, index) => (
                <NavItem
                  isActive={item === tabActive}
                  key={index}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {!doctorData ? (
            <div className="m-20 w-full h-full justify-center items-center flex">
              Loading...
            </div>
          ) : (
            <>
              {/* LOOP ITEMS Doctors */}
              {tabActive === "Doctors" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                  {doctorData.map((doctor, index) => (
                    <DoctorsCard key={index} doctor={doctor} />
                  ))}
                </div>
              )}
              {/* LOOP ITEMS POSTS */}
              {tabActive === "Clinics" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-8 mt-8 lg:mt-10">
                  {orgData?.map((org, index) => (
                    <OrganizationsCard key={index} org={org} />
                  ))}
                </div>
              )}
              {/* LOOP ITEMS TAGS */}
              {tabActive === "Specialization" && (
                <div className="flex flex-wrap mt-12 ">
                  {tags.map((tag) => (
                    <Tag className="mb-3 mr-3" key={tag.id} tag={tag} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageSearch;
