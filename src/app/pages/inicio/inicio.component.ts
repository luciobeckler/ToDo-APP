import { Component, OnInit } from '@angular/core';
import { Task, TaskType, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { TaskSharedService } from '../../services/task-shared.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  showModal = false;
  taskTypes: TaskType[] = ['Em progresso', 'Em espera', 'Não iniciado', 'Finalizado'];
  taskGroups: Group[] = [];
  tasks: Task[] = [];
  activeGroupTitle: string = '';

  editingField: { task: Task, field: keyof Task } | null = null;
  selectedTask: Task | null = null;

  @Input() selectedGroupId: number | null = null;

  constructor(
    private taskService: TaskService,
    private groupService: GroupService,
    private taskSharedService: TaskSharedService
  ) { }

  ngOnInit(): void {
    this.taskSharedService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.selectedTask = null;
    });

    this.taskSharedService.groupTitle$.subscribe(title => {
      this.activeGroupTitle = title;
    });
    this.loadGroups();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Erro ao carregar tasks:', err);
      }
    });
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
      }
    });
  }

  getTasksByType(type: TaskType) {
    const priorityOrder: { [key in TaskPriority]: number } = {
      'Alta': 1,
      'Normal': 2,
      'Baixa': 3
    }; // REGRA PARA ORDENAR POR PRIORIDADE

    return this.tasks
      .filter(task => task.status === type)
      .sort((a, b) => {
        return priorityOrder[a.priority as TaskPriority] - priorityOrder[b.priority as TaskPriority];
      });
  }

  onStatusChange(task: Task): void {
    this.editingField = null;
  }

  setActiveGroupTitle(groupId: number | undefined) {
    if (!groupId || !this.taskGroups.length) return;

    const group = this.taskGroups.find(g => g.id === groupId);
    if (group) {
      this.activeGroupTitle = group.title;
    }
  }

  // BOTÃO ADICIONAR E SEU POPUP
  newTask: Task = {
    title: '',
    description: '',
    group: 'Trabalho',
    priority: 'Normal',
    startDateTime: '',
    endDateTime: '',
    status: 'Não iniciado',
  };

  addTask() {
    this.newTask.groupId = Number(this.newTask.groupId);

    if (!this.newTask.startDateTime) {
      delete this.newTask.startDateTime;
    }

    if (!this.newTask.endDateTime) {
      delete this.newTask.endDateTime;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: (addTask) => {
        this.tasks.push(addTask);
        this.showModal = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao adicionar task:', error);
      }
    });
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      group: 'Trabalho',
      priority: 'Normal',
      startDateTime: '',
      endDateTime: '',
      status: 'Não iniciado',
    };
  }

  // BOTÃO INFO DA TAREFA
  openTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  updateTask() {
    if (!this.selectedTask) return;

    this.taskService.updateTask(this.selectedTask).subscribe({
      next: () => {
        this.selectedTask = null;
        this.loadTasks();
      },
      error: (error) => {
        console.error('Erro ao atualizar a tarefa:', error);
      }
    });
  }

  deleteTask(taskToDelete: Task) {
    if (!taskToDelete.id) return;
    this.taskService.deleteTask(taskToDelete.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t !== taskToDelete);
      this.selectedTask = null;
    });
  }

  // REGRA PARA EDITAR DENTRO DA TABELA: NÃO PODE TER FINAL ANTES DE ÍNICIO
  finishEditing(task: Task, field: keyof Task): void {
    if (field === 'endDateTime' || field === 'startDateTime') {
      const start = new Date(task.startDateTime || '');
      const end = new Date(task.endDateTime || '');

      if (start && end && end < start) {
        alert('A data de fim não pode ser menor que a de início.');
        if (field === 'endDateTime') {
          task.endDateTime = '';
        } else if (field === 'startDateTime') {
          task.startDateTime = '';
        }
        return;
      }
    }

    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.editingField = null;
        this.loadTasks();
      },
      error: (error) => {
        console.error(`Erro ao atualizar o campo '${field}':`, error);
        alert('Erro ao salvar alteração. Tente novamente.');
      }
    });
  }

  // CORES POR BLOCO DE STATUS
  getColorByType(type: string): string {
    switch (type) {
      case 'Em progresso':
        return '#2ecc71';
      case 'Não iniciado':
        return '#3498db';
      case 'Finalizado':
        return '#7f8c8d';
      case 'Em espera':
      default:
        return '#f1ac38';
    }
  }

  getColumnStyle(type: string): { [key: string]: string } {
    return {
      borderLeft: `5px solid ${this.getColorByType(type)}`
    };
  }

  getHeaderStyle(type: string): { [key: string]: string } {
    return {
      borderBottom: `2px solid ${this.getColorByType(type)}`
    };
  }

  getTheadStyle(type: string): { [key: string]: string } {
    return {
      backgroundColor: this.getColorByType(type)
    };
  }
}