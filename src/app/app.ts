import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { canAnimate } from './motion/media';
import { InterestService } from './services/interest.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly interests = inject(InterestService);
  protected readonly theme = inject(ThemeService);

  private readonly count = viewChild<ElementRef<HTMLElement>>('count');
  private previousTotal = this.interests.total();

  constructor() {
    effect(() => {
      const total = this.interests.total();
      const element = this.count()?.nativeElement;
      if (element && total !== this.previousTotal && canAnimate()) {
        element.animate(
          [{ transform: 'scale(1.8) rotate(-8deg)' }, { transform: 'scale(1) rotate(0)' }],
          { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
        );
      }
      this.previousTotal = total;
    });
  }

  protected toggleTheme(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.theme.toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }
}
