
"use client";

import React from 'react';
import Image from 'next/image';
import ButtonPrimary from '@/ui/Button/ButtonPrimary';
import ButtonSecondary from '@/ui/Button/ButtonSecondary';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24">
            <Image
              src="/images/avatar.svg"
              alt="Profile"
              className="rounded-full"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold">Damien Smith</h1>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">MALE</span>
              <span className="text-green-700 bg-green-50 px-3 py-1 rounded-md text-sm">245566742-2</span>
            </div>
            <div className="flex gap-3">
              <ButtonPrimary>Call</ButtonPrimary>
              <ButtonSecondary>Schedule Visit</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['Encounters', 'Medications', 'Allergies', 'Vitals', 'Referrals', 'Immunisations', 'History', 'Notes'].map((tab) => (
          <button
            key={tab}
            className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Patient Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-gray-600 mb-1">DOB</h2>
            <p>17 / 02 / 1990 - 34 yrs 6 mos</p>
          </div>

          <div>
            <h2 className="text-gray-600 mb-1">Address</h2>
            <p>5200 Collins Ave</p>
            <p>Sunny Isles Beach, Florida 33160</p>
          </div>

          <div>
            <h2 className="text-gray-600 mb-1">Contacts</h2>
            <p>E: damiengsmith@gmail.com</p>
            <p>M: (405) 343-3446</p>
          </div>

          <div>
            <h2 className="text-gray-600 mb-1">Next Visit</h2>
            <div className="flex items-center gap-2">
              <div className="w-1 h-12 bg-blue-600 rounded-full"></div>
              <div>
                <p className="font-medium">17 May Monday</p>
                <p className="text-gray-600">10:15 AM</p>
              </div>
              <span className="ml-auto bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm">Standard</span>
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 mb-1">Active Conditions</h2>
            <div className="flex flex-wrap gap-2">
              {['Hypertension', 'Asthma', 'Dermatitis'].map((condition) => (
                <span key={condition} className="bg-gray-100 px-3 py-1 rounded-md">
                  {condition}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-gray-600 mb-1">Allergies</h2>
            <div className="flex flex-wrap gap-2">
              {['Latex', 'Levaquin', 'Peanuts'].map((allergy) => (
                <span key={allergy} className="bg-gray-100 px-3 py-1 rounded-md">
                  {allergy}
                </span>
              ))}
              <span className="bg-red-50 text-red-700 px-3 py-1 rounded-md">
                Penicillin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
