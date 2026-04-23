"use client";

import { useCreateCaseMutation } from "@/entities/case";
import { useForm, useWatch } from "react-hook-form";
import { CalculateData } from "@/shared/api/caseApi";
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
    } = useForm<CalculateData>({
        defaultValues: {
                mode: "",
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
    });

    // useCreateCase.ts
    const multipleNodules = useWatch({ control, name: "multiple_thyroid_nodules" });

    useEffect(() => {
        setValue("mode", multipleNodules ? "mtz" : "dtz");
    }, [multipleNodules, setValue]);

    const createCaseMutation = useCreateCaseMutation({ idPatient, onSuccessActions: [closeModal] });

    const onSubmit = (data: CalculateData) => {
        createCaseMutation.mutate({ ...data});
    };

    return {
        control,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting: isSubmitting || createCaseMutation.isPending,
    };
}