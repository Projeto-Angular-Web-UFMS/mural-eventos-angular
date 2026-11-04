function matches(query: string): boolean {
  return typeof matchMedia === 'function' && matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return matches('(prefers-reduced-motion: reduce)');
}

export function hasFinePointer(): boolean {
  return matches('(hover: hover) and (pointer: fine)');
}

export function canAnimate(): boolean {
  return typeof matchMedia === 'function' && !prefersReducedMotion();
}
