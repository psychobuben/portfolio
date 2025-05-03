let scrollPosition = 0;

document.getElementById('right-arrow')?.addEventListener('click', () => {
  const track = document.querySelector('.gallery-track');
  const itemWidth = track.querySelector('.project-item')?.offsetWidth + 20 || 240;
  scrollPosition -= itemWidth;
  track.style.transform = `translateX(${scrollPosition}px)`;
});

document.getElementById('left-arrow')?.addEventListener('click', () => {
  const track = document.querySelector('.gallery-track');
  const itemWidth = track.querySelector('.project-item')?.offsetWidth + 20 || 240;
  scrollPosition += itemWidth;
  track.style.transform = `translateX(${scrollPosition}px)`;
});