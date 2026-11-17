import { formatDate } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(
  control: AbstractControl<string | null>,
): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  // Data de hoje no fuso local: toISOString() usaria UTC e, à noite no Brasil, já seria amanhã.
  const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  return control.value > today ? null : { pastDate: true };
}
