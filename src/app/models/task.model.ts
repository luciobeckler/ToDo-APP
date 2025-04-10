export type TaskType = 'Não iniciado' | 'Em progresso' | 'Em espera' | 'Finalizado';
export type TaskPriority = 'Alta' | 'Normal' | 'Baixa';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    status: string;
    priority: string;
    startDateTime?: string;
    endDateTime?: string;
    groupId?: number;
    group?: string;
}