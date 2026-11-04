import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CourseEvent } from '../models/course-event';
import { EventCard } from './event-card';

describe('EventCard', () => {
  let fixture: ComponentFixture<EventCard>;
  const event: CourseEvent = {
    id: '1',
    titulo: 'Introdução ao Git e GitHub',
    data: '2026-11-10',
    local: 'Laboratório 3',
    categoria: 'Workshop',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCard);
    fixture.componentRef.setInput('event', event);
    await fixture.whenStable();
  });

  it('should show the date as dd/mm/yyyy', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('time')?.textContent).toBe('10/11/2026');
  });

  it('should link the title to the detail page', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('h2 a');
    expect(link?.getAttribute('href')).toBe('/eventos/1');
  });

  it('should toggle the interest button text', async () => {
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(button.textContent?.trim()).toBe('Tenho interesse');

    button.click();
    await fixture.whenStable();
    expect(button.textContent?.trim()).toBe('Remover interesse');

    button.click();
    await fixture.whenStable();
    expect(button.textContent?.trim()).toBe('Tenho interesse');
  });
});
