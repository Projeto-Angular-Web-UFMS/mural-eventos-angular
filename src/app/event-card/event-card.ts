import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseEvent } from '../models/course-event';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  // TODO 2: injete o InterestService (e importe-o no topo do arquivo).

  readonly event = input.required<CourseEvent>();
}
