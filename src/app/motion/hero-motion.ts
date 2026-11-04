import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export function playHeroMotion(root: HTMLElement): () => void {
  if (typeof matchMedia !== 'function') {
    return () => undefined;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  const media = gsap.matchMedia(root);

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const title = root.querySelector<HTMLElement>('.hero-title');
    const highlight = root.querySelector<HTMLElement>('.hero-highlight');
    const track = root.querySelector<HTMLElement>('.marquee-track');

    if (title) {
      const split = SplitText.create(title, { type: 'lines,chars', mask: 'lines', aria: 'auto' });

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(split.chars, { yPercent: 115, duration: 0.8, stagger: 0.022 })
        .from(highlight, { backgroundSize: '0% 100%', duration: 0.7, ease: 'power3.inOut' }, 0.35)
        .from(
          '.hero-caption, .hero-actions',
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          0.5,
        );

      gsap.to(title, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    if (track) {
      // A faixa só anda com a rolagem: nada se move sozinho por mais de 5 s (WCAG 2.2.2).
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'max', scrub: 0.8 },
        },
      );
    }
  });

  return () => media.revert();
}
