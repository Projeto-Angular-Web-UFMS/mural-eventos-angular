import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseEvent } from '../models/course-event';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  readonly event = input.required<CourseEvent>();
}
