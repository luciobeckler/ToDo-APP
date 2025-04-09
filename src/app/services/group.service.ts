import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Group {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'https://localhost:7194/api/Groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  addGroup(title: string): Observable<Group> {
    return this.http.post<Group>(this.baseUrl, { title });
  }

  updateGroup(group: Group): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update?id=${group.id}`, { title: group.title });
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}?id=${id}`);
  }  
}