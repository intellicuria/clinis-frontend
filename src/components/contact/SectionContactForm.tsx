"use client";
import React, { useState, useRef } from "react";
import Input from "@/ui/Input/Input";
import Label from "@/ui/Label/Label";
import Textarea from "@/ui/Textarea/Textarea";
import Select from "@/ui/Select/Select";
import Button from "@/ui/Button/Button";
import { toast } from "react-toastify";
import { sendContactForm } from "@/lib/actions/ContactServices";
export default function SectionContactForm() {
  const [formData, setFormData] = useState({
    userType: "doctor", // default value for the userType select field
    fullName: "",
    emailAddress: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    if (
      lastSubmissionTime &&
      Date.now() - lastSubmissionTime < 24 * 60 * 60 * 1000
    ) {
      toast.error("Please wait 24 hours before submitting another message.");
      return;
    }

    try {
      const resp = await sendContactForm(formData);
      localStorage.setItem("lastSubmissionTime", Date.now().toString());
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5  sm:p-10 rounded-b-lg rounded-t-xl lg:w-11/12 2xl:w-4/5 sm:border-2 2xl:ml-20 lg:ml-10 bg-white dark:bg-neutral-900 dark:border-neutral-800 border-gray-100">
        <form className="grid grid-cols-1 gap-4" onSubmit={sendEmail}>
          <div className="w-full gap-5 grid grid-cols-2">
            <label className="block">
              <Label className="text-gray-500 dark:text-white">I am a</Label>
              <Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 text-gray-500 dark:text-white"
              >
                <option value="Doctor">Doctor</option>
                <option value="Health Care Specialist">
                  Health Care Specialist
                </option>
                <option value="Care Seeker">Care Seeker</option>
              </Select>
            </label>
            <label className="block">
              <Label className="text-gray-500 dark:text-white">Full name</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Example Doe"
                rounded="rounded-md"
                type="text"
                className="mt-1 text-gray-500 dark:text-white"
              />
            </label>
          </div>
          <label className="block">
            <Label className="text-gray-500 dark:text-white">
              Email address
            </Label>
            <Input
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              rounded="rounded-md"
              type="email"
              placeholder="example@example.com"
              className="mt-1 text-gray-500 dark:text-white"
            />
          </label>
          <label className="block">
            <Label className="text-gray-500 dark:text-white">Message</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              className="mt-1 text-gray-500 dark:text-white"
              rows={6}
            />
          </label>
          <Button
            type="submit"
            loading={loading}
            className="text-black"
            pattern="default"
          >
            Send Message
          </Button>
        </form>
      </div>
    </>
  );
}
