export type TaskType = 'Não iniciado' | 'Em progresso' | 'Em espera' | 'Finalizado';
export type TaskGroup = 'Pessoal' | 'Trabalho' | 'Hobby' | 'Outros';
export type TaskPriority = 'Alta' | 'Normal' | 'Baixa';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
    priority: TaskPriority;
    group: TaskGroup;
    type: TaskType;
    groupId?: number;
}