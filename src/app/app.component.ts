import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';

  tasks: Task[] = [];

  onTasksFiltered(tasks: Task[]) {
    this.tasks = tasks;
  }
}
