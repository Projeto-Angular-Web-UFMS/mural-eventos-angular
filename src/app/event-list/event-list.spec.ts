import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CourseEvent } from '../models/course-event';
import { EventService } from '../services/event.service';
import { EventList } from './event-list';

const events: CourseEvent[] = [
  {
    id: '2',
    titulo: 'Carreira em Web',
    data: '2026-11-18',
    local: 'Auditório',
    categoria: 'Palestra',
  },
  { id: '1', titulo: 'Git e GitHub', data: '2026-11-10', local: 'Lab 3', categoria: 'Workshop' },
  { id: '3', titulo: 'Hackathon', data: '2026-12-05', local: 'Bloco', categoria: 'Hackathon' },
];

async function setup(list: () => Observable<CourseEvent[]>) {
  await TestBed.configureTestingModule({
    imports: [EventList],
    providers: [provideRouter([]), { provide: EventService, useValue: { list } }],
  }).compileComponents();

  const fixture = TestBed.createComponent(EventList);
  await fixture.whenStable();
  return fixture;
}

function titles(fixture: ComponentFixture<EventList>): string[] {
  const links = (fixture.nativeElement as HTMLElement).querySelectorAll('app-event-card h2 a');
  return Array.from(links, (link) => link.textContent?.trim() ?? '');
}

async function type(fixture: ComponentFixture<EventList>, selector: string, value: string) {
  const field = (fixture.nativeElement as HTMLElement).querySelector<
    HTMLInputElement | HTMLSelectElement
  >(selector)!;
  field.value = value;
  field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input'));
  await fixture.whenStable();
}

describe('EventList', () => {
  it('should list events sorted by the closest date', async () => {
    const fixture = await setup(() => of(events));
    expect(titles(fixture)).toEqual(['Git e GitHub', 'Carreira em Web', 'Hackathon']);
  });

  it('should combine the title search and the category filter', async () => {
    const fixture = await setup(() => of(events));

    await type(fixture, '#search', 'GIT');
    expect(titles(fixture)).toEqual(['Git e GitHub']);

    await type(fixture, '#category', 'Palestra');
    expect(titles(fixture)).toEqual([]);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Nenhum evento encontrado',
    );
  });

  it('should show an error message when the API is down', async () => {
    const fixture = await setup(() => throwError(() => new Error('offline')));
    const alert = (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Não foi possível carregar os eventos');
  });
});
