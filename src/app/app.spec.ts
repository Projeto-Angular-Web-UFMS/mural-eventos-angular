import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { InterestService } from './services/interest.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand in the header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Mural de Eventos');
  });

  it('should update the interest counter in the header immediately', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const counter = (fixture.nativeElement as HTMLElement).querySelector('.counter')!;
    expect(counter.textContent?.trim()).toBe('Meus interesses: 0');

    TestBed.inject(InterestService).toggle('1');
    await fixture.whenStable();
    expect(counter.textContent?.trim()).toBe('Meus interesses: 1');
  });
});
