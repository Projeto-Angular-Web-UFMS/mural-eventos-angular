import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { futureDateValidator } from './future-date.validator';

function dateFromToday(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, 'yyyy-MM-dd', 'en-US');
}

describe('futureDateValidator', () => {
  it('should ignore an empty value', () => {
    expect(futureDateValidator(new FormControl(''))).toBeNull();
  });

  it('should accept tomorrow', () => {
    expect(futureDateValidator(new FormControl(dateFromToday(1)))).toBeNull();
  });

  it('should reject today and past dates', () => {
    expect(futureDateValidator(new FormControl(dateFromToday(0)))).toEqual({ pastDate: true });
    expect(futureDateValidator(new FormControl(dateFromToday(-1)))).toEqual({ pastDate: true });
  });
});
