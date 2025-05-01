window.addEventListener('DOMContentLoaded', () => {
  const scrollBox = document.getElementById('autoScrollBox');
  let scrollInterval;
  let isPausedForReset = false;

  if (scrollBox) {
    const startScrolling = () => {
      if (!scrollInterval && !isPausedForReset) {
        scrollInterval = setInterval(() => {
          const isAtBottom =
            Math.ceil(scrollBox.scrollTop + scrollBox.clientHeight) >= scrollBox.scrollHeight;

          if (isAtBottom) {
            // Zastav scrollování a připrav se na návrat nahoru
            stopScrolling();
            isPausedForReset = true;

            scrollBox.scrollTo({ top: 0, behavior: 'smooth' });

            // Počkáme, až scroll skutečně doběhne (čas lze upravit)
            setTimeout(() => {
              isPausedForReset = false;
              startScrolling(); // znovu spustíme scroll
            }, 1000);
          } else {
            scrollBox.scrollBy({ top: 1, behavior: 'smooth' });
          }
        }, 30);
      }
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
      scrollInterval = null;
    };

    // Spustit scroll na začátku
    startScrolling();

    // Přerušit scroll při interakci
    scrollBox.addEventListener('mouseenter', stopScrolling);
    scrollBox.addEventListener('mouseleave', () => {
      if (!isPausedForReset) startScrolling();
    });
    scrollBox.addEventListener('mousedown', stopScrolling);
    scrollBox.addEventListener('mouseup', () => {
      if (!isPausedForReset) startScrolling();
    });
  }
});