import {createInstance, RequestOptions} from "./api-instance";

// DTO

export type CalculateData = {
    mode: string | '';
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

export const createCase = (idPatient: string, data: CalculateData, options?: RequestOptions) =>
    createInstance<void>(
        {url: `/patients/${idPatient}/calculate/`, method: "POST", data: data},
        options,
    );

export const caseApi = {
    createCase,
};
