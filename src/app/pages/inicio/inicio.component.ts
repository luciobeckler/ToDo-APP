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
  taskGroups: string[] = ['Trabalho', 'Pessoal', 'Hobby', 'Outros'];
  editingField: { task: Task, field: keyof Task } | null = null;
  selectedTask: Task | null = null;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Tela de criar mensagens padrão',
      description: 'Implementar layout e lógica para mensagens pré-definidas',
      group: 'Trabalho',
      groupId: 5,
      priority: 'Normal',
      startDateTime: '2025-04-05',
      endDateTime: '2025-04-10',
      type: 'Não iniciado'
    },
    {
      id: 2,
      title: 'Planejamento da plataforma web',
      description: 'Criar wireframes e definir tecnologias',
      group: 'Trabalho',
      groupId: 5,
      priority: 'Alta',
      startDateTime: '2025-04-01',
      endDateTime: '2025-04-15',
      type: 'Em progresso'
    },
    {
      id: 3,
      title: 'Viagem ao interior',
      description: 'Organizar documentos e planejar roteiro',
      group: 'Outros',
      groupId: 7,
      priority: 'Normal',
      startDateTime: '2025-04-20',
      endDateTime: '2025-04-25',
      type: 'Não iniciado'
    },
    {
      id: 4,
      title: 'Melhorias visuais',
      description: 'Ajustes de UI e UX com base em feedbacks',
      group: 'Trabalho',
      groupId: 5,
      priority: 'Baixa',
      type: 'Finalizado'
    },
    {
      id: 5,
      title: 'Yoga semanal',
      description: 'Aula de yoga toda segunda às 7h',
      group: 'Pessoal',
      groupId: 6,
      priority: 'Normal',
      type: 'Em progresso'
    },
    {
      id: 6,
      title: 'Reorganizar a estante de livros',
      description: 'Separar por gênero e ordem alfabética',
      group: 'Hobby',
      groupId: 8,
      priority: 'Baixa',
      type: 'Não iniciado'
    }
  ];

  getTasksByType(type: TaskType) {
    const priorityOrder = { 'Alta': 1, 'Normal': 2, 'Baixa': 3 };

    return this.tasks
      .filter(task => task.type === type)
      .sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority]; // REGRA PARA ORDENAR POR PRIORIDADE
      });
  }

  onStatusChange(task: Task): void {
    this.editingField = null;
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