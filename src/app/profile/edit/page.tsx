
"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store";
import ButtonPrimary from "@/ui/Button/ButtonPrimary";
import Image from "next/image";
import Input from "@/ui/Input/Input";
import { useRouter } from "next/navigation";
import { getPatientProfile, updatePatientProfile, updateProfileImage } from "@/lib/actions/PatientService";
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    dob: "",
    gender: "",
    blood_group: "",
    height: "",
    weight: "",
    medical_history: [] as string[],
    allergies: [] as string[],
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await getPatientProfile();
      if (response?.data?.status) {
        const data = response.data.data;
        setFormData({
          fullname: data.fullname || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          address: "",
          dob: data.dob || "",
          gender: data.gender || "",
          blood_group: data.blood_group || "",
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          medical_history: data.medical_history || [],
          allergies: data.allergies || [],
        });
      } else {
        toast.error(response?.data?.message || "Failed to fetch profile data");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update profile data
      const response = await updatePatientProfile({
        ...formData,
        height: Number(formData.height),
        weight: Number(formData.weight),
      });

      if (response.status) {
        // Upload image if selected
        if (imageFile) {
          const formDataImg = new FormData();
          formDataImg.append('profile_image', imageFile);
          await updateProfileImage(formDataImg);
        }
        
        toast.success("Profile updated successfully");
        router.push("/profile");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-24 h-24">
            <Image
              src={imageFile ? URL.createObjectURL(imageFile) : "/images/avatar.svg"}
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profileImage"
          />
          <label htmlFor="profileImage">
            <ButtonPrimary>Change Photo</ButtonPrimary>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                name="fullname"
                value={formData.fullname}
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
                name="phone_number"
                value={formData.phone_number}
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
                name="dob"
                value={formData.dob}
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
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="blood_group"
                value={formData.blood_group}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <Input
                name="height"
                value={formData.height}
                onChange={handleChange}
                type="number"
                placeholder="Enter height in cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <Input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                type="number"
                placeholder="Enter weight in kg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </ButtonPrimary>
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
