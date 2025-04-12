import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { Group } from '../../models/group.model';
import { taskPriority, taskStatus } from '../../constantes/constantes';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.css'],
})
export class TaskDetailModalComponent {
  @Input() task!: Task;
  @Input() taskGroups: Group[] = [];
  @Input() priorityList: string[] = taskPriority;
  @Input() statusList: string[] = taskStatus;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task);
  }
}
