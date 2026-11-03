import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseEvent } from '../models/course-event';
import { InterestService } from '../services/interest.service';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  protected readonly interests = inject(InterestService);

  readonly event = input.required<CourseEvent>();
}
