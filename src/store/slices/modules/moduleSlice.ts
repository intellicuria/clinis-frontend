import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getAllModules,
  getModulesbyId,
} from "@/lib/actions/module.action";
const SLICE_BASE_NAME = "moduleslice";
import {
  ModuleInformation,
  ModuleCategory,
  Response,
  ResponseModule,
} from "@/types/module.types";
interface currentIDandName {
  workspace: { name: string; id: string };
  case: { name: string; id: string };
  visit: { name: string; id: string };
}

export type ModuleState = {
  currentRouteKey: string;
  currentIDandName: currentIDandName;
};

export const initialState: ModuleState = {
  currentRouteKey: "",
  currentIDandName: {
    workspace: { name: "", id: "" },
    case: { name: "", id: "" },
    visit: { name: "", id: "" },
  },
};

export const getModules = createAsyncThunk(
  `${SLICE_BASE_NAME}/getModules`,
  async () => {
    const response = await getAllModules<Response<ModuleInformation[]>>();
    console.log(response);
    return response.data;
  }
);

// export const getFilteredModules = createAsyncThunk(
//   SLICE_NAME + "/filtermodules",
//   async (data: FilterData) => {
//     const response = await apiFilterModules<ModuleList, FilterData>(data);
//     console.log(response);
//     return response;
//   }
// );
// export const getSearchedModules = createAsyncThunk(
//   SLICE_NAME + "/searchmodules",
//   async (data: SearchData) => {
//     console.log(data);
//     const response = await apiSearchModulesbyName<ModuleList, SearchData>(data);
//     return response;
//   }
// );

export const getModuleById = createAsyncThunk(
  `${SLICE_BASE_NAME}/getModulesbyId`,
  async (id: string) => {
    const module = await getModulesbyId<Response<ModuleInformation>>({
      moduleID: id,
    });
    return module.data;
  }
);

export const getModuleCategory = createAsyncThunk(
  `${SLICE_BASE_NAME}/getmodulebycategory`,
  async () => {
    const category = await getAllCategories<ModuleCategory[]>();
    console.log(category);
    return category;
  }
);

export const moduleSlice = createSlice({
  name: `${SLICE_BASE_NAME}/module`,
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action: PayloadAction<string>) => {
      state.currentRouteKey = action.payload;
    },
    setCurrentWorkspaceCaseVisit: (state, action) => {
      console.log(state);
      state.currentIDandName = {
        ...state.currentIDandName,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentRouteKey, setCurrentWorkspaceCaseVisit } =
  moduleSlice.actions;

export default moduleSlice.reducer;
