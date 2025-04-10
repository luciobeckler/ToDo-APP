import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { apiUrl } from '../constantes/constantes';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private endPoint = '/Groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${apiUrl + this.endPoint}`);
  }

  getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${apiUrl + this.endPoint}/${groupId}`);
  }

  addGroup(title: string): Observable<Group> {
    return this.http.post<Group>(`${apiUrl + this.endPoint}`, { title });
  }

  updateGroup(group: Group): Observable<void> {
    return this.http.put<void>(
      `${apiUrl + this.endPoint}/update?id=${group.id}`,
      {
        title: group.title,
      }
    );
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl + this.endPoint}?id=${id}`);
  }
}
