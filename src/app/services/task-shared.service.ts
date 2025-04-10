import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskSharedService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    tasks$ = this.tasksSubject.asObservable();

    private groupTitleSubject = new BehaviorSubject<string>('');
    groupTitle$ = this.groupTitleSubject.asObservable();

    setTasks(tasks: Task[], groupTitle: string = '') {
        this.tasksSubject.next(tasks);
        this.groupTitleSubject.next(groupTitle);
    }
}