import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { environmet } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = environmet.apiUrl;
  private endPoint = '/Groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl + this.endPoint}`);
  }

  getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl + this.endPoint}/${groupId}`);
  }

  addGroup(title: string): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl + this.endPoint}`, { title });
  }

  updateGroup(group: Group): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl + this.endPoint}/update?id=${group.id}`,
      {
        title: group.title,
      }
    );
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + this.endPoint}?id=${id}`);
  }
}
