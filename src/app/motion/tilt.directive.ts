import { Directive, ElementRef, inject } from '@angular/core';
import { hasFinePointer, prefersReducedMotion } from './media';

const MAX_TILT_DEG = 7;

@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'reset()',
  },
})
export class Tilt {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly enabled = hasFinePointer() && !prefersReducedMotion();
  private frame = 0;

  protected onPointerMove(event: PointerEvent): void {
    if (!this.enabled) {
      return;
    }
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const element = this.element.nativeElement;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      element.style.setProperty('--tilt-x', `${(0.5 - y) * MAX_TILT_DEG * 2}deg`);
      element.style.setProperty('--tilt-y', `${(x - 0.5) * MAX_TILT_DEG * 2}deg`);
      element.style.setProperty('--glare-x', `${x * 100}%`);
      element.style.setProperty('--glare-y', `${y * 100}%`);
      element.classList.add('is-tilting');
    });
  }

  protected reset(): void {
    cancelAnimationFrame(this.frame);
    const element = this.element.nativeElement;
    element.classList.remove('is-tilting');
    element.style.removeProperty('--tilt-x');
    element.style.removeProperty('--tilt-y');
  }
}
