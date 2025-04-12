import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { TaskSharedService } from '../../services/task-shared.service';
import { taskPriority, taskStatus } from '../../constantes/constantes';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  showModal = false;
  statusList: string[] = taskStatus;
  priorityList: string[] = taskPriority;
  taskGroups: Group[] = [];
  tasks: Task[] = [];
  activeGroupTitle: string = '';
  groupId: number | null = null;

  editingField: { task: Task; field: keyof Task } | null = null;
  selectedTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private groupService: GroupService,
    private taskSharedService: TaskSharedService
  ) {}

  ngOnInit(): void {
    this.taskSharedService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.selectedTask = null;
    });

    this.taskSharedService.groupTitle$.subscribe((title) => {
      this.activeGroupTitle = title;
    });

    this.taskSharedService.groupId$.subscribe((id) => {
      this.groupId = id;
    });

    this.loadGroups();
  }

  loadTasks() {
    if (!this.groupId) return;
    this.loadTasksByGroupId(this.groupId);
  }

  loadGroups() {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.taskGroups = groups;
        if (this.tasks.length > 0) {
          const groupId = this.tasks[0].groupId;
          this.setActiveGroupTitle(groupId);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar grupos:', err);
      },
    });
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

  setActiveGroupTitle(groupId: number | undefined) {
    if (!groupId || !this.taskGroups.length) return;

    const group = this.taskGroups.find((g) => g.id === groupId);
    if (group) {
      this.activeGroupTitle = group.title;
    }
  }

  // BOTÃO ADICIONAR E SEU POPUP
  newTask: Task = {
    title: '',
    description: '',
    priority: this.priorityList[0],
    startDateTime: '',
    endDateTime: '',
    status: this.statusList[0],
  };

  addTask() {
    if (!this.newTask.startDateTime) {
      delete this.newTask.startDateTime;
    }

    if (!this.newTask.endDateTime) {
      delete this.newTask.endDateTime;
    }

    if (!this.newTask.groupId) {
      delete this.newTask.groupId;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (addTask) => {
        this.tasks.push(addTask);
        this.showModal = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao adicionar task:', error);
      },
    });
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: this.priorityList[0],
      startDateTime: '',
      endDateTime: '',
      status: this.statusList[0],
    };
  }

  // BOTÃO INFO DA TAREFA
  openTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  updateTask() {
    if (!this.selectedTask) {
      console.log('Dados insuficientes:', this.selectedTask, this.groupId);
      return;
    }
    const updatedTask = { ...this.selectedTask };
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.selectedTask = null;
        this.showModal = false;
        if (this.groupId !== null) {
          this.groupService.getGroupById(this.groupId).subscribe({
            next: (group) => {
              this.tasks = group.tasks || [];
              this.groupId = null;
            },
            error: (error) => {
              console.error('Erro ao recarregar tasks após update:', error);
            },
          });
        } else {
          this.taskService.getTasks().subscribe({
            next: (tasks) => {
              this.tasks = tasks.filter((task) => task.groupId == null);
            },
            error: (error) => {
              console.error('Erro ao recarregar tarefas sem grupo:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      },
    });
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

  deleteTask(taskToDelete: Task) {
    if (!taskToDelete.id) return;
    this.taskService.deleteTask(taskToDelete.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t !== taskToDelete);
      this.selectedTask = null;
    });
  }

  // REGRA PARA EDITAR DENTRO DA TABELA: NÃO PODE TER FINAL ANTES DE ÍNICIO
  finishEditing(task: Task, field: keyof Task): void {
    this.editingField = null;

    const updatedTask = { ...task };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        console.log(`Tarefa atualizada com sucesso! Campo alterado: ${field}`);
      },
      error: (error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      },
    });
  }

  // CORES POR BLOCO DE STATUS
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
}
