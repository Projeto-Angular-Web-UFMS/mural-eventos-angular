import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { CourseEvent } from '../models/course-event';
import { EventService } from '../services/event.service';
import { EventDetail } from './event-detail';

const event: CourseEvent = {
  id: '1',
  titulo: 'Introdução ao Git e GitHub',
  descricao: 'Oficina prática de versionamento para calouros.',
  data: '2026-11-10',
  local: 'Laboratório 3',
  categoria: 'Workshop',
};

async function setup(get: (id: string) => Observable<CourseEvent>) {
  await TestBed.configureTestingModule({
    imports: [EventDetail],
    providers: [provideRouter([]), { provide: EventService, useValue: { get } }],
  }).compileComponents();

  const fixture = TestBed.createComponent(EventDetail);
  fixture.componentRef.setInput('id', '1');
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('EventDetail', () => {
  it('should show all the event data', async () => {
    const element = await setup(() => of(event));

    expect(element.querySelector('h1')?.textContent).toContain('Introdução ao Git e GitHub');
    expect(element.textContent).toContain('Oficina prática de versionamento');
    expect(element.querySelector('time')?.textContent).toBe('10/11/2026');
    expect(element.textContent).toContain('Laboratório 3');
    expect(element.querySelector('a[href="/"]')?.textContent).toContain('Voltar');
  });

  it('should show "Evento não encontrado" on a 404', async () => {
    const element = await setup(() => throwError(() => new HttpErrorResponse({ status: 404 })));

    expect(element.querySelector('h1')?.textContent).toContain('Evento não encontrado');
    expect(element.querySelector('a[href="/"]')).not.toBeNull();
  });

  it('should show an error message when the API is down', async () => {
    const element = await setup(() => throwError(() => new HttpErrorResponse({ status: 0 })));

    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      'Não foi possível carregar o evento',
    );
  });
});
