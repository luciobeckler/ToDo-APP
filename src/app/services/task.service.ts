import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { apiUrl } from '../constantes/constantes';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endPoint = '/ToDoTasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${apiUrl + this.endPoint}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(`${apiUrl + this.endPoint}`, task);
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${apiUrl + this.endPoint}?id=${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl + this.endPoint}/${id}`);
  }
}
