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

  constructor(
    private taskService: TaskService,
    private groupService: GroupService,
    private taskSharedService: TaskSharedService
  ) {}

  ngOnInit(): void {
    this.taskSharedService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.taskSharedService.groupTitle$.subscribe((title) => {
      this.activeGroupTitle = title;
    });

    this.taskSharedService.groupId$.subscribe((id) => {
      this.groupId = id;
    });

    this.taskSharedService.groupList$.subscribe((groups) => {
      this.taskGroups = groups;
    });

    this.loadGroups();
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

  addTask(newTask: Task) {
    this.taskService.addTask(newTask).subscribe({
      next: (task: Task) => {
        if (task.groupId == this.groupId) this.tasks.push(task);
        this.showModal = false;
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
}
