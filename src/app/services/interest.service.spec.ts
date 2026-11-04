import { TestBed } from '@angular/core/testing';
import { InterestService } from './interest.service';

describe('InterestService', () => {
  let service: InterestService;

  beforeEach(() => {
    service = TestBed.inject(InterestService);
  });

  it('should start with no interests', () => {
    expect(service.total()).toBe(0);
    expect(service.hasInterest('1')).toBe(false);
  });

  it('should add and then remove an interest when toggled twice', () => {
    service.toggle('1');
    expect(service.hasInterest('1')).toBe(true);
    expect(service.total()).toBe(1);

    service.toggle('1');
    expect(service.hasInterest('1')).toBe(false);
    expect(service.total()).toBe(0);
  });

  it('should count interests in different events', () => {
    service.toggle('1');
    service.toggle('2');
    expect(service.total()).toBe(2);
  });
});
