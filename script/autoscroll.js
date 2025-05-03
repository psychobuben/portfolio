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

            // Zpožděné navrácení nahoru
            setTimeout(() => {
              scrollBox.scrollTop = 0;
              setTimeout(() => {
                isPausedForReset = false;
                startScrolling();
              }, 1000); // druhé zpoždění po scrollTo
            }, 2000); // pauza před návratem
          } else {
            scrollBox.scrollTop += 1;
          }
        }, 30);
      }
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
      scrollInterval = null;
    };

    // Spustit scrollování
    startScrolling();

    // Detekce interakce na PC i mobilu
    const pauseHandler = () => {
      stopScrolling();
    };

    const resumeHandler = () => {
      if (!isPausedForReset) startScrolling();
    };

    scrollBox.addEventListener('mouseenter', pauseHandler);
    scrollBox.addEventListener('mouseleave', resumeHandler);
    scrollBox.addEventListener('mousedown', pauseHandler);
    scrollBox.addEventListener('mouseup', resumeHandler);
    scrollBox.addEventListener('touchstart', pauseHandler);
    scrollBox.addEventListener('touchend', resumeHandler);
  }
});
