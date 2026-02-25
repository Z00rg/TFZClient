"use client";

import { useCreateCaseMutation } from "@/entities/case";
import { useForm, useWatch } from "react-hook-form";
import { CreateCase } from "@/shared/api/caseApi";
import { useEffect } from "react";

export type UseCreateCaseFormProps = {
    closeModal: () => void;
    idPatient: string;
};

export function useCreateCaseForm({ closeModal, idPatient }: UseCreateCaseFormProps) {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateCase>({
        defaultValues: {
            patient: idPatient,
            diagnosis: "",
            patient_par: {
                st4: "",
                ttg: "",
                atrttg: "",
                thyroid_volume: "",
                eop_stage: "",
                thyrostatic_daily_dose_mg: "",
                thyrostatic_therapy_duration_months: "",
                ccc_complications: false,
                compression_syndrome: false,
                slco1b1_polymorphism: false,
                multiple_thyroid_nodules: false,
            },
        },
    });

    const multipleNodules = useWatch({ control, name: "patient_par.multiple_thyroid_nodules" });

    useEffect(() => {
        setValue("diagnosis", multipleNodules ? "МТЗ" : "ДТЗ");
    }, [multipleNodules, setValue]);

    const createCaseMutation = useCreateCaseMutation({ onSuccessActions: [closeModal] });

    const onSubmit = (data: CreateCase) => {
        createCaseMutation.mutate({ ...data, patient: idPatient });
    };

    return {
        control,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting: isSubmitting || createCaseMutation.isPending,
    };
}