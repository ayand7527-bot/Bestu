import confetti from 'canvas-confetti';

export function fireHeartConfetti(originX = 0.5, originY = 0.6) {
  // Fire pastel hearts and sparkles
  const heartShape = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 57,18 75,56z',
  });

  confetti({
    particleCount: 30,
    spread: 70,
    origin: { x: originX, y: originY },
    shapes: [heartShape, 'circle'],
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#c084fc', '#e879f9', '#fde047'],
    scalar: 1.4,
    gravity: 0.8,
    ticks: 200,
  });
}

export function fireCelebrationConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#fb7185', '#f472b6', '#c084fc', '#fbcfe8', '#fed7aa'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#f472b6', '#fef08a'],
    });
  }, 250);
}
