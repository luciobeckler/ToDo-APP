export type TaskType = 'Não iniciado' | 'Em progresso' | 'Em espera' | 'Finalizado';
export type TaskGroup = 'Pessoal' | 'Trabalho' | 'Hobby' | 'Viagem';
export type TaskPriority = 'Alta' | 'Normal' | 'Baixa';

export interface Task {
    title: string;
    startDateTime?: string;
    endDateTime?: string;
    priority: TaskPriority;
    group: TaskGroup;
    type: TaskType;
}
