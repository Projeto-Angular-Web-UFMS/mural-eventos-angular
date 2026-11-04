import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { prefersReducedMotion } from '../motion/media';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'mural-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    this.apply(this.theme());
  }

  toggle(origin?: { x: number; y: number }): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const root = this.document.documentElement;

    if (!this.document.startViewTransition || prefersReducedMotion()) {
      this.set(next);
      return;
    }

    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? 0;
    root.style.setProperty('--reveal-x', `${x}px`);
    root.style.setProperty('--reveal-y', `${y}px`);
    root.style.setProperty(
      '--reveal-radius',
      `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`,
    );
    root.classList.add('theme-transition');

    const transition = this.document.startViewTransition(() => this.set(next));
    transition.finished.finally(() => root.classList.remove('theme-transition'));
  }

  private set(theme: Theme): void {
    this.theme.set(theme);
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Sem armazenamento (aba privada): o tema vale só nesta visita.
    }
  }

  private apply(theme: Theme): void {
    this.document.documentElement.dataset['theme'] = theme;
  }

  private initialTheme(): Theme {
    const current = this.document.documentElement.dataset['theme'];
    if (current === 'light' || current === 'dark') {
      return current;
    }
    const prefersDark =
      typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
