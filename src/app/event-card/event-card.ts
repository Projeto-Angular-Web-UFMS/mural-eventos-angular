import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseEvent } from '../models/course-event';
import { Tilt } from '../motion/tilt.directive';
import { InterestService } from '../services/interest.service';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, DatePipe, Tilt],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  protected readonly interests = inject(InterestService);

  readonly event = input.required<CourseEvent>();

  protected readonly categoryClass = computed(() => `cat-${this.event().categoria.toLowerCase()}`);
  protected readonly titleId = computed(() => `event-${this.event().id}-title`);
}
