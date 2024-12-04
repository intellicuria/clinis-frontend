import { createSlice } from '@reduxjs/toolkit'

export interface CreatedHealthResponse {
    token: string
    healthIdNumber: string
    name: string
    gender: string
    address: string
    yearOfBirth: number | null
    monthOfBirth: number | null
    dayOfBirth: number | null
    firstName: string
    healthId: number | null
    lastName: string
    middleName: string
    stateCode: number | null
    districtCode: number | null
    stateName: string
    districtName: string
    email: string | null
    kycPhoto: string
    profilePhoto: string
    mobile: string
    authMethods:
        | 'AADHAAR_OTP'
        | 'DEMOGRAPHICS'
        | 'AADHAAR_BIO '
        | 'MOBILE_OTP'
        | string
    pincode: number | null
    tags: string
    new: boolean
}
export type DialogState = {
    isAddPatientOpen: boolean
    isAddWorkspaceOpen: boolean
    isAddCaseOpen: boolean
    isEditPatientOpen: boolean
    isAddVisitOpen: boolean
    isGenearteMedicalDocumentOpen: boolean
    isPrescriptionGenerator: boolean
    isAddOrganisation: boolean
    isEditOrganisation: boolean
    isAddAddressOrganization: boolean
    isAddTemplate: boolean
    isAddDoctor: boolean
    HealthIdInformation: CreatedHealthResponse
    isModuleDialogOpen: boolean
    isCreateModuleDialogOpen: boolean
}

export const HealthInfoIntialState = {
    token: '',
    healthIdNumber: '',
    name: '',
    gender: '',
    address: '',
    yearOfBirth: null,
    monthOfBirth: null,
    dayOfBirth: null,
    firstName: '',
    healthId: null,
    lastName: '',
    middleName: '',
    stateCode: null,
    districtCode: null,
    stateName: '',
    districtName: '',
    email: null,
    kycPhoto: '',
    profilePhoto: '',
    mobile: '',
    authMethods: '',
    pincode: null,
    tags: '',
    new: false,
}
const initialState: DialogState = {
    isAddPatientOpen: false,
    isAddWorkspaceOpen: false,
    isAddCaseOpen: false,
    isEditPatientOpen: false,
    isAddVisitOpen: false,
    isGenearteMedicalDocumentOpen: false,
    isPrescriptionGenerator: false,
    isAddOrganisation: false,
    isEditOrganisation: false,
    isAddAddressOrganization: false,
    isAddTemplate: false,
    isAddDoctor: false,
    HealthIdInformation: HealthInfoIntialState,
    isModuleDialogOpen: false,
    isCreateModuleDialogOpen: false,
}

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        toggleAddPatient: (state, action) => {
            state.isAddPatientOpen = action.payload
        },
        toggleAddWorkspace: (state, action) => {
            state.isAddWorkspaceOpen = action.payload
        },
        toggleAddCase: (state, action) => {
            state.isAddCaseOpen = action.payload
        },
        toggleEditPatient: (state, action) => {
            state.isEditPatientOpen = action.payload
        },
        toggleAddVisit: (state, action) => {
            state.isAddVisitOpen = action.payload
        },
        toggleGenearteMedicalDocument: (state, action) => {
            state.isGenearteMedicalDocumentOpen = action.payload
        },
        togglePrescriptionGenerator: (state, action) => {
            state.isPrescriptionGenerator = action.payload
        },
        setHealthinformation: (state, action) => {
            state.HealthIdInformation = action.payload
        },
        toggleAddOrganisation: (state, action) => {
            state.isAddOrganisation = action.payload
        },
        toggleEditOrganisation: (state, action) => {
            state.isEditOrganisation = action.payload
        },
        toogleAddAddressOrganisation: (state, action) => {
            state.isAddAddressOrganization = action.payload
        },
        toggleAddTemplate: (state, action) => {
            state.isAddTemplate = action.payload
        },
        toggleAddDoctor: (state, action) => {
            state.isAddDoctor = action.payload
        },
        toggleModuleDialog: (state, action) => {
            state.isModuleDialogOpen = action.payload
        },
        toggleCreateModuleDialog: (state, action) => {
            state.isCreateModuleDialogOpen = action.payload
        },
    },
})

export const {
    toggleAddPatient,
    toggleAddWorkspace,
    toggleAddCase,
    toggleEditPatient,
    toggleAddVisit,
    toggleGenearteMedicalDocument,
    togglePrescriptionGenerator,
    setHealthinformation,
    toggleAddOrganisation,
    toggleEditOrganisation,
    toogleAddAddressOrganisation,
    toggleAddTemplate,
    toggleAddDoctor,
    toggleModuleDialog,
    toggleCreateModuleDialog,
} = dialogSlice.actions

export default dialogSlice.reducer
