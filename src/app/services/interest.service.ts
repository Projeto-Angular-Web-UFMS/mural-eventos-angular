import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InterestService {
  private readonly interestedIds = signal<string[]>([]);

  readonly total = computed(() => this.interestedIds().length);

  hasInterest(id: string): boolean {
    return this.interestedIds().includes(id);
  }

  toggle(id: string): void {
    this.interestedIds.update((ids) =>
      ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id],
    );
  }
}
