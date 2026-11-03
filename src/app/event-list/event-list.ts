import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventCard } from '../event-card/event-card';
import { CourseEvent, EVENT_CATEGORIES } from '../models/course-event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, RouterLink],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  private readonly eventService = inject(EventService);

  protected readonly categories = EVENT_CATEGORIES;
  protected readonly events = signal<CourseEvent[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly search = signal('');
  protected readonly category = signal('');

  protected readonly filteredEvents = computed(() => {
    const term = this.search().trim().toLowerCase();
    const category = this.category();

    return this.events()
      .filter((event) => !category || event.categoria === category)
      .filter((event) => event.titulo.toLowerCase().includes(term))
      .sort((a, b) => a.data.localeCompare(b.data));
  });

  constructor() {
    this.eventService.list().subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }
}
