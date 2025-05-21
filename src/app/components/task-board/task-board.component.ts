import { Component, input, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { taskPriority, taskStatus } from '../../constantes/constantes';
import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() groupId: number | null = null;
  @Input() activeGroupTitle: string = '';
  @Input() taskGroups: Group[] = [];
  statusList: string[] = taskStatus;
  priorityList: string[] = taskPriority;
  editingField: { task: Task; field: keyof Task } | null = null;
  selectedTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {}

  getColorByType(type: string): string {
    switch (type) {
      case this.statusList[0]:
        return '#9CA3AF';
      case this.statusList[1]:
        return '#3B82F6';
      case this.statusList[2]:
        return '#10B981';
      case this.statusList[3]:
        return '#EF4444';
      default:
        return '#6B7280';
    }
  }

  getColumnStyle(type: string): { [key: string]: string } {
    return {
      borderLeft: `5px solid ${this.getColorByType(type)}`,
    };
  }

  getHeaderStyle(type: string): { [key: string]: string } {
    return {
      borderBottom: `2px solid ${this.getColorByType(type)}`,
    };
  }

  getTheadStyle(type: string): { [key: string]: string } {
    return {
      backgroundColor: this.getColorByType(type),
    };
  }

  getTasksByType(type: string): Task[] {
    return this.tasks
      .filter((task) => task.status === type)
      .sort((a, b) => {
        const aIndex = this.priorityList.indexOf(a.priority || '');
        const bIndex = this.priorityList.indexOf(b.priority || '');
        return aIndex - bIndex;
      });
  }

  onStatusChange(task: Task): void {
    this.editingField = null;
  }

  finishEditing(task: Task, field: keyof Task): void {
    this.editingField = null;

    const updatedTask = { ...task };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      },
    });
  }

  openTaskDetails(task: Task) {
    debugger;
    this.selectedTask = task;
  }

  deleteTask(task: Task) {
    if (!task.id) return;
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.selectedTask = null;
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.selectedTask = null;
        this.loadTasks();
      },
      error: (err) => console.error('Erro ao atualizar:', err),
    });
  }

  loadTasks() {
    if (!this.groupId) return;
    this.loadTasksByGroupId(this.groupId);
  }

  loadTasksByGroupId(groupId: number) {
    this.groupService.getGroupById(groupId).subscribe({
      next: (group) => {
        this.tasks = group.tasks || [];
        this.activeGroupTitle = group.title;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas do grupo:', error);
      },
    });
  }
}
