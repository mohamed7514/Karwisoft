// A single painting travels behind a fixed, framed window. The alternate direction
// makes the return continuous: no photo changes, opacity fades or loop reset.
export function createHeroPanorama(section: HTMLElement) {
  const image = section.querySelector<HTMLImageElement>('.vision-panorama');
  const glass = section.querySelector<HTMLElement>('.vision-glass');
  let playing = false, reduced = false, disposed = false, ready = false;
  let animation: Animation | undefined;

  const sync = () => {
    if (!image || !ready || disposed) return;
    if (reduced) {
      animation?.cancel();
      animation = undefined;
      return;
    }
    if (!animation) {
      animation = image.animate([
        { transform: 'translate3d(0, 0, 0)' },
        { transform: 'translate3d(-66.666667%, 0, 0)' },
      ], {
        duration: 42000, iterations: Infinity, direction: 'alternate',
        easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'both',
      });
      // Begin at the same central view as the static fallback, without a load jump.
      animation.currentTime = 21000;
    }
    if (playing) animation.play();
    else animation.pause();
  };

  if (image) void image.decode().then(() => {
    if (disposed) return;
    ready = true;
    if (glass) glass.dataset.ready = 'true';
    sync();
  }).catch(() => {
    if (!disposed && glass) glass.dataset.ready = 'error';
  });

  return {
    setPlaying(value: boolean) { playing = value; sync(); },
    setReducedMotion(value: boolean) { reduced = value; sync(); },
    dispose() { disposed = true; animation?.cancel(); },
  };
}
