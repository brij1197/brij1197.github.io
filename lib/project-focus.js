import { animation } from "../content/animation.js";

export function selectProject(rects, viewportHeight) {
  const trigger = Math.min(
    animation.projectTriggerMax,
    viewportHeight * animation.projectTriggerRatio,
  );
  const visible = rects
    .map((rect, index) => ({ rect, index }))
    .filter(
      ({ rect }) =>
        rect.bottom > viewportHeight * 0.08 && rect.top < viewportHeight * 1.02,
    );
  if (!visible.length) return -1;
  const reached = visible.filter(({ rect }) => rect.top <= trigger);
  return (reached.length ? reached[reached.length - 1] : visible[0]).index;
}
