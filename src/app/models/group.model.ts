import { Task } from "./task.model";

export interface Group {
    id: number;
    title: string;
    tasks: Task[];
}