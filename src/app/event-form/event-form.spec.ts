import { formatDate } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { EventService } from '../services/event.service';
import { EventForm } from './event-form';

describe('EventForm', () => {
  let fixture: ComponentFixture<EventForm>;
  let element: HTMLElement;
  const create = vi.fn();

  beforeEach(async () => {
    create.mockReset().mockReturnValue(of({ id: '5' }));

    await TestBed.configureTestingModule({
      imports: [EventForm],
      providers: [provideRouter([]), { provide: EventService, useValue: { create } }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventForm);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  async function fill(selector: string, value: string) {
    const field = element.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    field.value = value;
    field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input'));
    await fixture.whenStable();
  }

  async function submit() {
    element.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  }

  it('should not submit an empty form and should show one error per field', async () => {
    await submit();

    expect(create).not.toHaveBeenCalled();
    expect(element.querySelectorAll('.error').length).toBe(4);
    expect(element.querySelector('#event-title')?.getAttribute('aria-describedby')).toBe(
      'event-title-error',
    );
  });

  it('should reject a past date', async () => {
    await fill('#event-date', '2020-01-01');
    await submit();

    expect(element.querySelector('#event-date-error')?.textContent).toContain(
      'A data deve ser futura',
    );
  });

  it('should create the event and go back to the list', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const date = formatDate(nextYear, 'yyyy-MM-dd', 'en-US');

    await fill('#event-title', 'Angular Signals');
    await fill('#event-date', date);
    await fill('#event-location', 'Auditório');
    await fill('#event-category', 'Palestra');
    await submit();

    expect(create).toHaveBeenCalledWith({
      titulo: 'Angular Signals',
      descricao: undefined,
      data: date,
      local: 'Auditório',
      categoria: 'Palestra',
    });
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
