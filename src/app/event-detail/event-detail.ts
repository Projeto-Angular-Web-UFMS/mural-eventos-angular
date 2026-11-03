import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseEvent } from '../models/course-event';
import { EventService } from '../services/event.service';

type DetailStatus = 'loading' | 'found' | 'not-found' | 'error';

@Component({
  selector: 'app-event-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  private readonly eventService = inject(EventService);

  readonly id = input.required<string>();

  protected readonly event = signal<CourseEvent | null>(null);
  protected readonly status = signal<DetailStatus>('loading');

  ngOnInit(): void {
    this.eventService.get(this.id()).subscribe({
      next: (event) => {
        this.event.set(event);
        this.status.set('found');
      },
      error: (error: HttpErrorResponse) => {
        this.status.set(error.status === 404 ? 'not-found' : 'error');
      },
    });
  }
}
