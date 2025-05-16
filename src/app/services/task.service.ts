import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private endPoint = '/ToDoTasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl + this.endPoint}`, {
      withCredentials: true,
    });
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl + this.endPoint}`, task, {
      withCredentials: true,
    });
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl + this.endPoint}?id=${task.id}`,
      task,
      { withCredentials: true }
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + this.endPoint}/${id}`);
  }
}
