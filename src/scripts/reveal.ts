document.addEventListener('astro:page-load', () => {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal') ?? []);
          const index = siblings.indexOf(entry.target as Element);
          (entry.target as HTMLElement).style.transitionDelay = `${index * 0.08}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
});
