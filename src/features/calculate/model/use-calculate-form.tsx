"use client";
/* eslint-disable */
import {useState, useMemo} from "react";

// Типы данных
interface CalculateFormData {
    age: number | '';
    gender: "male" | "female";
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
}

type CalculatorMode = 'dtz' | 'mtz';

export function useCalculateForm(mode: CalculatorMode) {
    const isMtz = mode === 'mtz';

    const [result, setResult] = useState<string | null>(null);
    const [formData, setFormData] = useState<CalculateFormData>({
        age: '',
        gender: "male",
        st4: '',
        ttg: '',
        atrttg: '',
        thyroid_volume: '',
        eop_stage: '',
        thyrostatic_daily_dose_mg: '',
        thyrostatic_therapy_duration_months: '',
        ccc_complications: false,
        compression_syndrome: false,
        slco1b1_polymorphism: false,
    });

    // Валидация
    const isFormValid = useMemo(() => {
        const age = Number(formData.age);
        const st4 = Number(formData.st4);
        const ttg = Number(formData.ttg);
        const atrttg = Number(formData.atrttg);
        const thyroid_volume = Number(formData.thyroid_volume);
        const eop_stage = Number(formData.eop_stage);
        const daily_dose = Number(formData.thyrostatic_daily_dose_mg);
        const duration = Number(formData.thyrostatic_therapy_duration_months);

        return (
            formData.age !== '' && age > 0 &&
            formData.st4 !== '' && st4 > 0 &&
            formData.ttg !== '' && ttg > 0 &&
            formData.atrttg !== '' && atrttg > 0 &&
            formData.thyroid_volume !== '' && thyroid_volume > 0 &&
            formData.eop_stage !== '' && eop_stage >= 0 &&
            formData.thyrostatic_daily_dose_mg !== '' && daily_dose >= 0 &&
            formData.thyrostatic_therapy_duration_months !== '' && duration >= 0 &&
            !isNaN(age) &&
            !isNaN(st4) &&
            !isNaN(ttg) &&
            !isNaN(atrttg) &&
            !isNaN(thyroid_volume) &&
            !isNaN(eop_stage) &&
            !isNaN(daily_dose) &&
            !isNaN(duration)
        );
    }, [formData]);

    const handleInputChange = (field: keyof CalculateFormData, value: any) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleCalculate = () => {
        if (!isFormValid) return;

        // multiple_thyroid_nodules: для МТЗ — всегда true, для ДТЗ — всегда false
        const multiple_thyroid_nodules = isMtz;

        const score = calculateScore(formData, multiple_thyroid_nodules);
        const recommendation = getRecommendation(formData, score, multiple_thyroid_nodules, mode);
        setResult(recommendation);
    };

    // Функция расчета баллов
    const calculateScore = (data: CalculateFormData, multiple_thyroid_nodules: boolean): number => {
        let totalScore = 0;

        const age = Number(data.age);
        const st4 = Number(data.st4);
        const ttg = Number(data.ttg);
        const atrttg = Number(data.atrttg);
        const thyroid_volume = Number(data.thyroid_volume);
        const eop_stage = Number(data.eop_stage);
        const thyrostatic_daily_dose_mg = Number(data.thyrostatic_daily_dose_mg);
        const thyrostatic_therapy_duration_months = Number(data.thyrostatic_therapy_duration_months);

        // 1. Возраст
        if (age > 50) totalScore += 0;
        else if (age >= 40 && age <= 49) totalScore += 1;
        else if (age >= 31 && age <= 39) totalScore += 2;
        else if (age >= 0 && age <= 30) totalScore += 3;

        // 2. Пол
        if (data.gender === "female") totalScore += 0;
        else if (data.gender === "male") totalScore += 1;

        // 3. сТ4 (нг/дл)
        if (st4 >= 0 && st4 <= 1.78) totalScore += 0;
        else if (st4 >= 1.79 && st4 <= 2.78) totalScore += 1;
        else if (st4 >= 2.79 && st4 <= 3.78) totalScore += 2;
        else if (st4 >= 3.79 && st4 <= 4.78) totalScore += 3;
        else if (st4 > 4.78) totalScore += 4;

        // 4. ТТГ (мкМЕ/мл)
        if (ttg > 2.5) totalScore += 0;
        else if (ttg >= 0.1 && ttg <= 2.5) totalScore += 1;
        else if (ttg < 0.1) totalScore += 4;

        // 5. АтрТТГ (МЕ/л)
        if (atrttg <= 1.0) totalScore += 0;
        else if (atrttg >= 1.01 && atrttg <= 3.0) totalScore += 1;
        else if (atrttg >= 3.01 && atrttg <= 5.0) totalScore += 2;
        else if (atrttg >= 5.01 && atrttg <= 10.0) totalScore += 3;
        else if (atrttg > 10.0) totalScore += 4;

        // 6. Объем ЩЖ
        if (thyroid_volume < 25) totalScore += 0;
        else if (thyroid_volume >= 25 && thyroid_volume <= 40) totalScore += 1;
        else if (thyroid_volume >= 40.01 && thyroid_volume <= 60) totalScore += 2;
        else if (thyroid_volume >= 60.01 && thyroid_volume <= 80) totalScore += 3;
        else if (thyroid_volume > 80) totalScore += 4;

        // 7. Эндокринная офтальмопатия
        totalScore += eop_stage;

        // 8. Суточная доза тиреостатиков
        if (thyrostatic_daily_dose_mg >= 0 && thyrostatic_daily_dose_mg <= 4.9) totalScore += 0;
        else if (thyrostatic_daily_dose_mg >= 5 && thyrostatic_daily_dose_mg <= 10) totalScore += 1;
        else if (thyrostatic_daily_dose_mg >= 10.01 && thyrostatic_daily_dose_mg <= 15) totalScore += 2;
        else if (thyrostatic_daily_dose_mg >= 15.01 && thyrostatic_daily_dose_mg <= 20) totalScore += 3;
        else if (thyrostatic_daily_dose_mg > 20) totalScore += 4;

        // 9. Длительность терапии
        if (thyrostatic_therapy_duration_months >= 13 && thyrostatic_therapy_duration_months <= 24) totalScore += 1;
        else if (thyrostatic_therapy_duration_months >= 25 && thyrostatic_therapy_duration_months <= 36) totalScore += 2;
        else if (thyrostatic_therapy_duration_months >= 37 && thyrostatic_therapy_duration_months <= 48) totalScore += 3;
        else if ((thyrostatic_therapy_duration_months >= 0 && thyrostatic_therapy_duration_months <= 12) || thyrostatic_therapy_duration_months > 48) totalScore += 4;

        // 10-13. Бинарные факторы
        if (data.ccc_complications) totalScore += 4;
        if (data.compression_syndrome) totalScore += 4;
        if (data.slco1b1_polymorphism) totalScore += 0;
        else totalScore += 4;
        if (multiple_thyroid_nodules) totalScore += 4;

        return totalScore;
    };

    // Функция определения рекомендаций
    const getRecommendation = (
        data: CalculateFormData,
        score: number,
        multiple_thyroid_nodules: boolean,
        mode: CalculatorMode
    ): string => {
        let severity = "";
        if (score >= 0 && score <= 13) severity = "легкая";
        else if (score >= 14 && score <= 26) severity = "средняя";
        else if (score >= 27 && score <= 40) severity = "тяжелая";

        let recommendation = `Интегральный показатель: ${score} баллов.\nСтепень тяжести тиреотоксикоза: ${severity}.\n\n`;

        const hasPolymorphism = data.slco1b1_polymorphism;
        const isLightOrMedium = score >= 0 && score <= 17;
        const isMediumOrHeavy = score >= 18 && score <= 40;
        const atrttg = Number(data.atrttg);
        const lowAntibodies = atrttg <= 3.9;
        const highAntibodies = atrttg > 3.9;
        const noComplications = !data.ccc_complications;
        const isMale = data.gender === "male";

        if (mode === 'dtz') {
            // --- Рекомендации для ДТЗ ---
            recommendation += "--- Рекомендация для ДТЗ ---\n";

            if (hasPolymorphism && isLightOrMedium && lowAntibodies && noComplications) {
                recommendation += "Субтотальная резекция ЩЖ (СРЩЖ).\n";
                recommendation += "Обоснование: наличие полиморфизма SLCO1B1, легкая/средняя тяжесть (0-17 баллов), титр а/т к рТТГ ≤ 3,90 МЕ/л, отсутствие осложнений.";
            } else if (!hasPolymorphism && isMediumOrHeavy && (highAntibodies || isMale)) {
                recommendation += "Тиреоидэктомия.\n";
                recommendation += "Обоснование: отсутствие полиморфизма SLCO1B1, средняя/тяжелая тяжесть (18-40 баллов)";
                if (highAntibodies) recommendation += ", титр а/т к рТТГ > 3,90 МЕ/л";
                if (isMale) recommendation += ", мужской пол";
                recommendation += ".";
            } else {
                recommendation += "Требуется индивидуальная консультация специалиста для определения оптимального объема операции.";
            }
        } else {
            // --- Рекомендации для МТЗ ---
            recommendation += "--- Рекомендация для МТЗ ---\n";

            if (hasPolymorphism && isLightOrMedium && noComplications) {
                recommendation += "Субтотальная резекция ЩЖ (СРЩЖ).\n";
                recommendation += "Обоснование: наличие полиморфизма SLCO1B1, легкая/средняя тяжесть (0-17 баллов), отсутствие осложнений.";
            } else if (!hasPolymorphism && isMediumOrHeavy) {
                recommendation += "Тиреоидэктомия.\n";
                recommendation += "Обоснование: отсутствие полиморфизма SLCO1B1, средняя/тяжелая тяжесть (18-40 баллов), множественные узлы в обеих долях ЩЖ.";
            } else {
                recommendation += "Требуется индивидуальная консультация специалиста для определения оптимального объема операции.";
            }
        }

        return recommendation;
    };

    return {
        result,
        formData,
        handleInputChange,
        handleCalculate,
        isFormValid,
    };
}