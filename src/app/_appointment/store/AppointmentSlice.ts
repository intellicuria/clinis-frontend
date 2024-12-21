import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctor, getOrg } from "@/lib/actions/BookingApiService";
import { set } from "lodash";

interface DoctorData {
  id: number;
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

type DoctorDataArray = DoctorData[];

export type AppointmentState = {
  loading: boolean;
  allDoctors: DoctorDataArray;
  currentDoctor: DoctorData;
  currentOrg: any;
  selectedWorkspace: any;
  selectedDoctor: any;
  selectedSlot: any;
  selectedDate: string;
};
const initialState: AppointmentState = {
  loading: false,
  allDoctors: [] as DoctorDataArray,
  currentDoctor: {} as DoctorData,
  currentOrg: {} as any,
  selectedWorkspace: {
    label: "– select workspace –",
    description: "",
    value: -1,
  },
  selectedDoctor: {
    label: "– select doctor –",
    speciality: [],
    value: -1,
  },
  selectedSlot: {} as any,
  selectedDate: "",
};
export const SLICE_NAME = "AppointmentList";

export const getDoctorDetails = createAsyncThunk(
  SLICE_NAME + "/getDoctorDetails",
  async (username: string) => {
    const response = await getDoctor<{
      data: DoctorData;
    }>(username);

    return response.data;
  }
);
export const getOrganizationDetails = createAsyncThunk(
  SLICE_NAME + "/getOrganizationDetails",
  async (username: string) => {
    const response = await getOrg<{
      data: DoctorData;
    }>(username);

    return response.data;
  }
);

const ResearchSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {
    setNewDoctor: (state, action) => {
      state.allDoctors = [...state.allDoctors, action.payload];
    },
    setSelectedWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrg = action.payload;
      })
      .addCase(getOrganizationDetails.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  setNewDoctor,
  setSelectedWorkspace,
  setSelectedSlot,
  setSelectedDate,
  setSelectedDoctor,
} = ResearchSlice.actions;

export default ResearchSlice.reducer;
