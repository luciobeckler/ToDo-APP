import { Component } from '@angular/core';
import { Task, TaskType } from '../../models/task.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  showModal = false;
  taskTypes: TaskType[] = ['Em progresso', 'Em espera', 'Não iniciado', 'Finalizado'];
  editingField: { task: Task, field: keyof Task } | null = null;
  selectedTask: Task | null = null;

  tasks: Task[] = [
    {
      title: 'Tela de criar mensagens padrão',
      group: 'Trabalho',
      priority: 'Normal',
      startDateTime: '2025-04-05',
      endDateTime: '2025-04-10',
      type: 'Não iniciado'
    },
    {
      title: 'Tela de criar mensagens padrão',
      group: 'Trabalho',
      priority: 'Normal',
      startDateTime: '2025-04-05',
      endDateTime: '2025-04-10',
      type: 'Não iniciado'
    },
    {
      title: 'Planejamento da plataforma web',
      group: 'Trabalho',
      priority: 'Normal',
      type: 'Em progresso'
    },
    {
      title: 'Melhorias visuais',
      group: 'Trabalho',
      priority: 'Normal',
      type: 'Finalizado'
    },
    {
      title: 'Melhorias visuais',
      group: 'Trabalho',
      priority: 'Normal',
      type: 'Finalizado'
    },
  ];

  getTasksByType(type: TaskType) {
    const priorityOrder = { 'Alta': 1, 'Normal': 2, 'Baixa': 3 };

    return this.tasks
      .filter(task => task.type === type)
      .sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority]; // REGRA PARA ORDENAR POR PRIORIDADE
      });
  }

  // BOTÃO ADICIONAR E SEU POPUP
  newTask: Task = {
    title: '',
    group: 'Trabalho',
    priority: 'Normal',
    startDateTime: '',
    endDateTime: '',
    type: 'Não iniciado',
  };

  addTask() {
    if (this.newTask.startDateTime && this.newTask.endDateTime) {
      const start = new Date(this.newTask.startDateTime);
      const end = new Date(this.newTask.endDateTime);

      if (end < start) {
        alert('A data de fim não pode ser menor que a data de início.');
        return;
      }
    }

    this.tasks.push({ ...this.newTask });
    this.resetForm();
    this.showModal = false;
  }

  resetForm() {
    this.newTask = {
      title: '',
      group: 'Trabalho',
      priority: 'Normal',
      startDateTime: '',
      endDateTime: '',
      type: 'Não iniciado',
    };
  }

  // BOTÃO INFO DA TAREFA
  openTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  deleteTask(taskToDelete: Task) {
    this.tasks = this.tasks.filter(t => t !== taskToDelete);
    this.selectedTask = null;
  }

  // REGRA PARA EDITAR DENTRO DA TABELA: NÃO PODE TER FINAL ANTES DE ÍNICIO NEM O OPOSTO
  finishEditing(task: Task, field: keyof Task) {
    if (field === 'endDateTime' || field === 'startDateTime') {
      const start = new Date(task.startDateTime || '');
      const end = new Date(task.endDateTime || '');

      if (start && end && end < start) {
        alert('A data de fim não pode ser menor que a de início.');
        // Reverte o valor alterado
        if (field === 'endDateTime') {
          task.endDateTime = '';
        } else if (field === 'startDateTime') {
          task.startDateTime = '';
        }
        return;
      }
    }

    this.editingField = null;
  }

}