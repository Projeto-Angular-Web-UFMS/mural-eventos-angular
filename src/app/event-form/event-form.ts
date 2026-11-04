import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EVENT_CATEGORIES, EventCategory } from '../models/course-event';
import { EventService } from '../services/event.service';
import { futureDateValidator } from '../validators/future-date.validator';

type FieldName = 'titulo' | 'descricao' | 'data' | 'local' | 'categoria';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  protected readonly categories = EVENT_CATEGORIES;
  protected readonly submitting = signal(false);
  protected readonly submitError = signal(false);

  protected readonly form = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    descricao: new FormControl('', { nonNullable: true }),
    data: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, futureDateValidator],
    }),
    local: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected showError(field: FieldName): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { titulo, descricao, data, local, categoria } = this.form.getRawValue();
    this.submitting.set(true);
    this.submitError.set(false);

    this.eventService
      .create({
        titulo,
        descricao: descricao || undefined,
        data,
        local,
        categoria: categoria as EventCategory,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => {
          this.submitError.set(true);
          this.submitting.set(false);
        },
      });
  }
}
