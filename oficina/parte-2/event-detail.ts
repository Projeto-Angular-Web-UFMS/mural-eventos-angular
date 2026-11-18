import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { CourseEvent } from '../models/course-event';
import { EventService } from '../services/event.service';

type DetailStatus = 'loading' | 'found' | 'not-found' | 'error';

@Component({
  // TODO 4: o link do Angular (RouterLink) também precisa entrar nesta lista.
  imports: [DatePipe],
  selector: 'app-event-detail',
  styleUrl: './event-detail.css',
  templateUrl: './event-detail.html',
})
export class EventDetail implements OnInit {
  private readonly eventService = inject(EventService);

  // O ":id" da URL chega aqui sozinho, graças ao withComponentInputBinding() do app.config.ts.
  readonly id = input.required<string>();

  protected readonly event = signal<CourseEvent | null>(null);
  protected readonly status = signal<DetailStatus>('loading');

  ngOnInit(): void {
    // TODO 2: busque o evento pelo id com o serviço e atualize "event" e "status".
  }
}
