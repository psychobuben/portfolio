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
            stopScrolling();
            isPausedForReset = true;

            // Okamžitý návrat nahoru (bez smooth pro kompatibilitu s iOS)
            scrollBox.scrollTop = 0;

            setTimeout(() => {
              isPausedForReset = false;
              startScrolling();
            }, 1000);
          } else {
            // Jednoduché přičítání funguje spolehlivě i na iOS
            scrollBox.scrollTop += 1;
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