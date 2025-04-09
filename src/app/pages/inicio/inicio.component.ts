import { Component, OnInit } from '@angular/core';
import { Task, TaskType, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  showModal = false;
  taskTypes: TaskType[] = ['Em progresso', 'Em espera', 'Não iniciado', 'Finalizado'];
  taskGroups: string[] = ['Trabalho', 'Pessoal', 'Hobby', 'Outros'];
  editingField: { task: Task, field: keyof Task } | null = null;
  selectedTask: Task | null = null;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tasks carregadas:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar tasks:', err);
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

  deleteTask(taskToDelete: Task) {
    if (!taskToDelete.id) return;
    this.taskService.deleteTask(taskToDelete.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t !== taskToDelete);
      this.selectedTask = null;
    });
  }

  // REGRA PARA EDITAR DENTRO DA TABELA: NÃO PODE TER FINAL ANTES DE ÍNICIO NEM O OPOSTO
  finishEditing(task: Task, field: keyof Task) {
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

    this.taskService.updateTask(task).subscribe(() => {
      this.editingField = null;
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