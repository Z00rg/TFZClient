import {createInstance, RequestOptions} from "./api-instance";

// DTO

export type CreateCase = {
    patient: string;
    diagnosis: string;
    patient_par: Patient_data;
}

export type Patient_data = {
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
}

// API

export const createCase = (data: CreateCase, options?: RequestOptions) =>
    createInstance<void>(
        {url: `/cases/create/`, method: "POST", data: data},
        options,
    );

export const caseApi = {
    createCase,
};
