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
    return this.tasks.filter(task => task.type === type);
  }

  //Lógica do botão e popup de adicionar

  newTask: Task = {
    title: '',
    group: 'Trabalho',
    priority: 'Normal',
    startDateTime: '',
    endDateTime: '',
    type: 'Não iniciado',
  };

  addTask() {
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
}
