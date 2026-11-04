import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CourseEvent } from '../models/course-event';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EventService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should list events with GET /eventos', () => {
    const events: CourseEvent[] = [
      { id: '1', titulo: 'Git', data: '2026-11-10', local: 'Lab 3', categoria: 'Workshop' },
    ];
    let result: CourseEvent[] = [];

    service.list().subscribe((value) => (result = value));
    const request = httpTesting.expectOne('http://localhost:3000/eventos');
    request.flush(events);

    expect(request.request.method).toBe('GET');
    expect(result).toEqual(events);
  });

  it('should create an event with POST /eventos', () => {
    const newEvent: Omit<CourseEvent, 'id'> = {
      titulo: 'Angular Signals',
      data: '2027-01-20',
      local: 'Auditório',
      categoria: 'Palestra',
    };

    service.create(newEvent).subscribe();
    const request = httpTesting.expectOne('http://localhost:3000/eventos');
    request.flush({ id: '5', ...newEvent });

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newEvent);
  });

  it('should get one event with GET /eventos/:id', () => {
    service.get('3').subscribe();
    const request = httpTesting.expectOne('http://localhost:3000/eventos/3');
    request.flush({});

    expect(request.request.method).toBe('GET');
  });
});
