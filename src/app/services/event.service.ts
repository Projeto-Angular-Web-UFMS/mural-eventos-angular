import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseEvent } from '../models/course-event';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/eventos';

  list(): Observable<CourseEvent[]> {
    return this.http.get<CourseEvent[]>(this.apiUrl);
  }
}
