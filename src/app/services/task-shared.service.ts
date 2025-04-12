import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class TaskSharedService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private groupTitleSubject = new BehaviorSubject<string>('');
  groupTitle$ = this.groupTitleSubject.asObservable();

  private groupIdSubject = new BehaviorSubject<number | null>(null);
  groupId$ = this.groupIdSubject.asObservable();

  private groupListSubject = new BehaviorSubject<Group[]>([]);
  groupList$ = this.groupListSubject.asObservable();

  setTasks(tasks: Task[], groupTitle: string = '') {
    this.tasksSubject.next(tasks);
    this.groupTitleSubject.next(groupTitle);
  }

  setGroupId(id: number): void {
    this.groupIdSubject.next(id);
  }

  setGroupList(groups: Group[]) {
    this.groupListSubject.next(groups);
  }
}
