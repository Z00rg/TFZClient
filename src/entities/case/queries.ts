import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {caseApi, CalculateData} from "@/shared/api/caseApi";
import {queue} from "@/shared/ui/Toast";

// Action после мутации
type OnSuccessAction = () => void;

// Добавление нового приема
export function useCreateCaseMutation({ idPatient, onSuccessActions }: { idPatient: string, onSuccessActions?: OnSuccessAction[] }) {
    return useMutation({
        mutationFn: (data: CalculateData) => caseApi.createCase(idPatient, data),
        onSuccess: () => {
            queryClient.invalidateQueries();
            onSuccessActions?.forEach(onSuccessAction => onSuccessAction());

            queue.add({
                title: 'Прием добавлен',
                description: 'Прием успешно добавлен в систему',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при добавлении приема:", error);

            queue.add({
                title: 'Ошибка: прием не добавлен',
                description: `Ошибка при добавлении приема: ${error}`,
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });
}