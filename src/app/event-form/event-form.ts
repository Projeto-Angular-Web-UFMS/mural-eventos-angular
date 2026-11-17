import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EVENT_CATEGORIES, EventCategory } from '../models/course-event';
import { EventService } from '../services/event.service';
import { futureDateValidator } from '../validators/future-date.validator';

type FieldName = 'titulo' | 'descricao' | 'data' | 'local' | 'categoria';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-event-form',
  styleUrl: './event-form.css',
  templateUrl: './event-form.html',
})
export class EventForm {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  protected readonly categories = EVENT_CATEGORIES;
  protected readonly submitting = signal(false);
  protected readonly submitError = signal(false);

  // TODO 1: coloque os validadores de cada campo dentro dos colchetes de "validators".
  protected readonly form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [] }),
    descricao: new FormControl('', { nonNullable: true }),
    data: new FormControl('', { nonNullable: true, validators: [] }),
    local: new FormControl('', { nonNullable: true, validators: [] }),
    categoria: new FormControl('', { nonNullable: true, validators: [] }),
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

    const value = this.form.getRawValue();
    const event = { ...value, categoria: value.categoria as EventCategory };
    this.submitting.set(true);
    this.submitError.set(false);

    // TODO 2: cadastre o evento com o serviço e, no sucesso, volte para a lista.
  }
}
