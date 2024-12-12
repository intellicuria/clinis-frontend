
"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/store";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Image from "next/image";
import Input from "@/ui/Input/Input";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const { fullname, phone_number, id } = useAppSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    fullName: fullname || "",
    email: "",
    phoneNumber: phone_number || "",
    address: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    emergencyContact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    console.log("Form submitted:", formData);
    router.push("/profile");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-24 h-24">
            <Image
              src="/images/avatar.svg"
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <ButtonPrimary>Change Photo</ButtonPrimary>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <Input
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <Input
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                type="tel"
                placeholder="Emergency contact number"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <ButtonPrimary type="submit">Save Changes</ButtonPrimary>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
