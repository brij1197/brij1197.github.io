import assert from "node:assert/strict";
import test from "node:test";
import { selectProject } from "../lib/project-focus.js";

const cards = (offset = 0) =>
  Array.from({ length: 4 }, (_, i) => ({
    top: 140 + i * 455 - offset,
    bottom: 505 + i * 455 - offset,
    height: 365,
  }));

test("Projects anchor starts at the first card on short and tall viewports", () => {
  for (const height of [360, 600, 900, 1440, 2160])
    assert.equal(selectProject(cards(), height), 0, `height ${height}`);
});

test("regression: the former center rule skipped the first card on tall displays", () => {
  const height = 1440,
    rects = cards();
  const old = rects
    .map((r, i) => ({
      i,
      distance: Math.abs(r.top + r.height / 2 - height / 2),
    }))
    .sort((a, b) => a.distance - b.distance)[0].i;
  assert.equal(old, 1);
  assert.equal(selectProject(rects, height), 0);
});

test("normal scroll advances in order and reverse scroll returns to the first project", () => {
  assert.equal(selectProject(cards(200), 900), 0);
  assert.equal(selectProject(cards(300), 900), 1);
  assert.equal(selectProject(cards(400), 900), 1);
  assert.equal(selectProject(cards(855), 900), 2);
  assert.equal(selectProject(cards(1310), 900), 3);
  assert.equal(selectProject(cards(0), 900), 0);
});

test("the first diagram starts gathering as it enters the viewport", () => {
  for (const height of [600, 900, 1440]) {
    const rects = [
      { top: height * 0.98, bottom: height * 0.98 + 365, height: 365 },
    ];
    assert.equal(selectProject(rects, height), 0);
  }
});

test("no active project outside the featured section", () => {
  assert.equal(selectProject(cards(-1600), 900), -1);
  assert.equal(selectProject(cards(2400), 900), -1);
});
