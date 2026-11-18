import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InterestService {
  private readonly interestedIds = signal<string[]>([]);

  // TODO 1: crie o "total", um computed com a quantidade de ids da lista.

  hasInterest(id: string): boolean {
    return this.interestedIds().includes(id);
  }

  toggle(id: string): void {
    // TODO 1: tire o id da lista se ele já estiver nela; senão, acrescente.
  }
}
