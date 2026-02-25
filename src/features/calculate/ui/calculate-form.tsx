"use client";

import {useCalculateForm} from "../model/use-calculate-form";
import {
    Label,
    TextField,
    Input,
    RadioGroup,
    Radio,
    Checkbox,
    Button,
    Separator
} from 'react-aria-components';

export type CalculatorMode = 'dtz' | 'mtz';

interface CalculateFormProps {
    mode: CalculatorMode;
}

export function CalculateForm({ mode }: CalculateFormProps) {
    const {result, formData, handleCalculate, handleInputChange, isFormValid} = useCalculateForm(mode);

    const isMtz = mode === 'mtz';

    // Dynamic classes based on mode
    const cardClass = isMtz
        ? "border border-teal-200 p-6 rounded-2xl bg-gradient-to-br from-teal-50/80 to-teal-100/50 shadow-md"
        : "border border-blue-200 p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/50 shadow-md";

    const headingClass = isMtz
        ? "text-xl font-bold mb-5 text-teal-700 border-b-2 border-teal-300 pb-3 flex items-center gap-2"
        : "text-xl font-bold mb-5 text-[#006CB4] border-b-2 border-blue-300 pb-3 flex items-center gap-2";

    const inputClass = isMtz
        ? "h-11 px-4 rounded-lg border-2 border-gray-300 bg-white w-full focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
        : "h-11 px-4 rounded-lg border-2 border-gray-300 bg-white w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 placeholder:text-gray-400";

    const radioBoxClass = isMtz
        ? "w-6 h-6 rounded-full border-2 border-teal-400 bg-white group-hover:border-teal-500 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-teal-300 group-data-[selected]:border-teal-600 group-data-[selected]:bg-teal-600 transition-all duration-200 flex items-center justify-center"
        : "w-6 h-6 rounded-full border-2 border-blue-400 bg-white group-hover:border-blue-500 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-blue-300 group-data-[selected]:border-blue-600 group-data-[selected]:bg-blue-600 transition-all duration-200 flex items-center justify-center";

    const checkboxBoxClass = isMtz
        ? "w-6 h-6 rounded-md border-2 border-teal-400 bg-white flex items-center justify-center group-hover:border-teal-500 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-teal-300 group-data-[selected]:bg-teal-600 group-data-[selected]:border-teal-600 transition-all duration-200 flex-shrink-0 mt-0.5"
        : "w-6 h-6 rounded-md border-2 border-blue-400 bg-white flex items-center justify-center group-hover:border-blue-500 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-blue-300 group-data-[selected]:bg-blue-600 group-data-[selected]:border-blue-600 transition-all duration-200 flex-shrink-0 mt-0.5";

    const buttonClass = isMtz
        ? "w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform pressed:scale-[0.98] hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2"
        : "w-full bg-gradient-to-r from-[#006CB4] to-[#0056a3] hover:from-[#0056a3] hover:to-[#004080] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform pressed:scale-[0.98] hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2";

    const resultClass = isMtz
        ? "mt-8 p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/80 border-2 border-teal-400 shadow-xl"
        : "mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/80 border-2 border-blue-400 shadow-xl";

    const resultIconClass = isMtz
        ? "p-2 bg-teal-200 rounded-full"
        : "p-2 bg-blue-200 rounded-full";

    const resultIconInnerClass = isMtz
        ? "w-6 h-6 text-teal-700"
        : "w-6 h-6 text-blue-700";

    return (
        <div className="w-full max-w-4xl">
            <div className="flex flex-col gap-6">

                {/* ========== БАЗОВЫЕ ДАННЫЕ ========== */}
                <div className={cardClass}>
                    <h3 className={headingClass}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        Базовые данные пациента
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Возраст */}
                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                Возраст (лет) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                value={formData.age === '' ? '' : formData.age}
                                onChange={(e) => handleInputChange('age', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="Например, 45"
                                className={inputClass}
                            />
                        </TextField>

                        {/* Пол */}
                        <RadioGroup value={formData.gender} onChange={(value) => handleInputChange('gender', value)}>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                Пол <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-6 mt-2">
                                <Radio value="male" className="flex items-center gap-2 group">
                                    <div className={radioBoxClass}>
                                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-data-[selected]:opacity-100"/>
                                    </div>
                                    <span className="text-gray-700 font-medium cursor-pointer">Мужской</span>
                                </Radio>
                                <Radio value="female" className="flex items-center gap-2 group">
                                    <div className={radioBoxClass}>
                                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-data-[selected]:opacity-100"/>
                                    </div>
                                    <span className="text-gray-700 font-medium cursor-pointer">Женский</span>
                                </Radio>
                            </div>
                        </RadioGroup>
                    </div>

                    <Separator className={isMtz ? "text-teal-200 my-5" : "text-blue-200 my-5"}/>

                    {/* Объем ЩЖ */}
                    <TextField>
                        <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                            Объем щитовидной железы (мл) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="number"
                            onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                            step="0.1"
                            value={formData.thyroid_volume === '' ? '' : formData.thyroid_volume}
                            onChange={(e) => handleInputChange('thyroid_volume', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Например, 18.5"
                            className={inputClass}
                        />
                    </TextField>
                </div>

                {/* ========== ЛАБОРАТОРНЫЕ ПОКАЗАТЕЛИ ========== */}
                <div className={cardClass}>
                    <h3 className={headingClass}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                        Лабораторные показатели
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                сТ4 (нг/дл) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                step="0.01"
                                value={formData.st4 === '' ? '' : formData.st4}
                                onChange={(e) => handleInputChange('st4', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="1.5"
                                className={inputClass}
                            />
                        </TextField>

                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                ТТГ (мкМЕ/мл) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                step="0.01"
                                value={formData.ttg === '' ? '' : formData.ttg}
                                onChange={(e) => handleInputChange('ttg', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="0.01"
                                className={inputClass}
                            />
                        </TextField>

                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                АтрТТГ (МЕ/л) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                step="0.01"
                                value={formData.atrttg === '' ? '' : formData.atrttg}
                                onChange={(e) => handleInputChange('atrttg', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="12.8"
                                className={inputClass}
                            />
                        </TextField>
                    </div>
                </div>

                {/* ========== КЛИНИЧЕСКИЕ ФАКТОРЫ ========== */}
                <div className={cardClass}>
                    <h3 className={headingClass}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        Клинические факторы и терапия
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                Эндокринная офтальмопатия (стадия 0-3)
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                value={formData.eop_stage === '' ? '' : formData.eop_stage}
                                onChange={(e) => handleInputChange('eop_stage', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="Например, 1"
                                className={inputClass}
                            />
                        </TextField>

                        <TextField>
                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                                Суточная доза тиреостатиков (мг/сут)
                            </Label>
                            <Input
                                type="number"
                                onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                                step="0.1"
                                value={formData.thyrostatic_daily_dose_mg === '' ? '' : formData.thyrostatic_daily_dose_mg}
                                onChange={(e) => handleInputChange('thyrostatic_daily_dose_mg', e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="30"
                                className={inputClass}
                            />
                        </TextField>
                    </div>

                    <TextField className="mb-5">
                        <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-2">
                            Длительность тиреостатической терапии (мес.)
                        </Label>
                        <Input
                            type="number"
                            onKeyDown={(e) => { if (e.key === '-') e.preventDefault(); }}
                            value={formData.thyrostatic_therapy_duration_months === '' ? '' : formData.thyrostatic_therapy_duration_months}
                            onChange={(e) => handleInputChange('thyrostatic_therapy_duration_months', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="6"
                            className={inputClass}
                        />
                    </TextField>

                    <Separator className={isMtz ? "text-teal-200 my-5" : "text-blue-200 my-5"}/>

                    {/* Чекбоксы */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Checkbox
                            isSelected={formData.ccc_complications}
                            onChange={(checked) => handleInputChange('ccc_complications', checked)}
                            className="flex items-start gap-3 group"
                        >
                            <div className={checkboxBoxClass}>
                                <svg className="w-4 h-4 text-white opacity-0 group-data-[selected]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium cursor-pointer leading-tight">
                                Осложнения со стороны ССС
                            </span>
                        </Checkbox>

                        <Checkbox
                            isSelected={formData.compression_syndrome}
                            onChange={(checked) => handleInputChange('compression_syndrome', checked)}
                            className="flex items-start gap-3 group"
                        >
                            <div className={checkboxBoxClass}>
                                <svg className="w-4 h-4 text-white opacity-0 group-data-[selected]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium cursor-pointer leading-tight">
                                Компрессионный синдром
                            </span>
                        </Checkbox>

                        <Checkbox
                            isSelected={formData.slco1b1_polymorphism}
                            onChange={(checked) => handleInputChange('slco1b1_polymorphism', checked)}
                            className="flex items-start gap-3 group"
                        >
                            <div className={checkboxBoxClass}>
                                <svg className="w-4 h-4 text-white opacity-0 group-data-[selected]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium cursor-pointer leading-tight">
                                Полиморфизм гена SLCO1B1
                            </span>
                        </Checkbox>

                        {/* Множественные узлы — только для МТЗ (отображается как неизменяемый индикатор) */}
                        {isMtz ? (
                            <div className="flex items-start gap-3">
                                {/* Зафиксированный чекбокс - визуально отмечен, но не интерактивен */}
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 bg-teal-600 border-teal-600`}>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <div className="leading-tight">
                                    <span className="text-gray-700 font-medium leading-tight">
                                        Множественные узлы в ЩЖ (&gt; 10 мм)
                                    </span>
                                    <span className="block text-xs text-teal-600 font-semibold mt-0.5">
                                        Обязательный фактор для МТЗ
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* ========== КНОПКА ========== */}
                <Button
                    onPress={handleCalculate}
                    isDisabled={!isFormValid}
                    className={buttonClass}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    {isFormValid ? 'Рассчитать интегральный показатель' : 'Заполните все обязательные поля'}
                </Button>

                {/* Подсказка если форма невалидна */}
                {!isFormValid && (
                    <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        <span>
                            Пожалуйста, заполните все поля, отмеченные звездочкой (<span className="text-red-500">*</span>).
                            Для расчета необходимы все лабораторные показатели.
                        </span>
                    </div>
                )}
            </div>

            {/* ========== РЕЗУЛЬТАТ ========== */}
            {result && (
                <div className={resultClass}>
                    <div className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-3">
                        <div className={resultIconClass}>
                            <svg className={resultIconInnerClass} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        Результат расчета
                    </div>
                    <Separator className={isMtz ? "text-teal-200 my-4" : "text-blue-200 my-4"}/>
                    <pre className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-sans">
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
}