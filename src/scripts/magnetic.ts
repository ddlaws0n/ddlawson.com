const strength = 0.3;

document.querySelectorAll('.magnetic-cta').forEach((btn) => {
  const el = btn as HTMLElement;

  el.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});
