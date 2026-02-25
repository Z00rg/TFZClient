import {createInstance, RequestOptions} from "./api-instance";

// DTO

export type Patient = {
    id: string;
    fio: string;
    birth_date: string;
    gender: 0 | 1;
}

export type PatientCase = {
    id: number;
    patient: number;
    patient_fio: string;
    user: number;
    diagnosis: string;
    created_at: string;
    result_data: Result_data;
    recommendation: string;
}

export type Result_data = {
    st4: number | '';
    ttg: number | '';
    atrttg: number | '';
    thyroid_volume: number | '';
    eop_stage: number | '';
    thyrostatic_daily_dose_mg: number | '';
    thyrostatic_therapy_duration_months: number | '';
    ccc_complications: boolean;
    compression_syndrome: boolean;
    slco1b1_polymorphism: boolean;
    multiple_thyroid_nodules: boolean;
    recommendation: string;
}

export type CreatePatient = {
    name: string;
    surname: string;
    patronymic: string;
    birth_date: string;
    gender: 0 | 1;
}

export type UpdatePatient = Partial<CreatePatient>

// API

export const getPatientList = (options?: RequestOptions) =>
    createInstance<Patient[]>(
        {url: `/patients/`, method: "GET"},
        options
    );

export const getPatientCase = (idPatient: string | undefined, idCase: number | undefined, options?: RequestOptions) =>
    createInstance<PatientCase>(
        {url: `/patients/${idPatient}/cases/${idCase}`, method: "GET"},
        options
    );

export const getPatientCasesList = (idPatient: string, options?: RequestOptions) =>
    createInstance<PatientCase[]>(
        {url: `/patients/${idPatient}/cases/`, method: "GET"},
        options
    );

export const createPatient = (data: CreatePatient, options?: RequestOptions) =>
    createInstance<void>(
        {url: `/patients/create/`, method: "POST", data: data},
        options,
    );

export const updatePatient = (idPatient: number, data: UpdatePatient, options?: RequestOptions) =>
    createInstance<void>(
        {url: `/patients/update/${idPatient}`, method: "PATCH", data: data},
        options
    );

export const patientApi = {
    getPatientList,
    getPatientCasesList,
    getPatientCase,
    createPatient,
    updatePatient,
};
