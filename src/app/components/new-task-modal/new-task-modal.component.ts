import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { Group } from '../../models/group.model';
import { taskPriority, taskStatus } from '../../constantes/constantes';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css'],
})
export class NewTaskModalComponent {
  @Input() visible: boolean = false;
  @Input() taskGroups: Group[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Task>();

  newTask: Task = {
    title: '',
    description: '',
    priority: taskPriority[0],
    startDateTime: '',
    endDateTime: '',
    status: taskStatus[0],
  };

  priorityList = taskPriority;
  statusList = taskStatus;

  submitForm() {
    if (!this.newTask.startDateTime) delete this.newTask.startDateTime;
    if (!this.newTask.endDateTime) delete this.newTask.endDateTime;
    if (!this.newTask.groupId) delete this.newTask.groupId;

    this.create.emit(this.newTask);
    this.resetForm();
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: taskPriority[0],
      startDateTime: '',
      endDateTime: '',
      status: taskStatus[0],
    };
  }
}
