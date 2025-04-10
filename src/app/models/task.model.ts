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
