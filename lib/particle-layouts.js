export function findRoute(cols = 17, rows = 11) {
  const start = [1, 5],
    goal = [15, 5];
  const wall = (x, y) => (x === 6 && y < 8) || (x === 11 && y > 2);
  const queue = [start],
    parents = new Map([[start.join(","), null]]);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    if (x === goal[0] && y === goal[1]) break;
    for (const [dx, dy] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      const nx = x + dx,
        ny = y + dy,
        key = [nx, ny].join(",");
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= cols ||
        ny >= rows ||
        wall(nx, ny) ||
        parents.has(key)
      )
        continue;
      parents.set(key, [x, y]);
      queue.push([nx, ny]);
    }
  }
  const route = [];
  let at = goal;
  while (at) {
    route.push(at);
    at = parents.get(at.join(","));
  }
  route.reverse();
  return { route, wall, cols, rows };
}

export function makeLayout(index, count, random) {
  const segments = [];
  const line = (a, b, kind = 0, flow = -1, end = flow) =>
    segments.push({
      a,
      b,
      kind,
      flow,
      end,
      length: Math.hypot(...a.map((v, i) => v - b[i])),
    });
  const rect = (x, y, w, h) => {
    const p = [
      [x - w / 2, y - h / 2, 0],
      [x + w / 2, y - h / 2, 0],
      [x + w / 2, y + h / 2, 0],
      [x - w / 2, y + h / 2, 0],
    ];
    p.forEach((a, i) => line(a, p[(i + 1) % 4]));
  };
  const ellipse = (x, y, w, h) => {
    for (let i = 0; i < 48; i++) {
      const t = (i / 48) * Math.PI * 2,
        s = ((i + 1) / 48) * Math.PI * 2;
      line(
        [x + Math.cos(t) * w, y + Math.sin(t) * h, 0],
        [x + Math.cos(s) * w, y + Math.sin(s) * h, 0],
      );
    }
  };
  if (index === 0 || index === 2) {
    rect(-0.6, -0.04, 0.42, 0.42);
    rect(0, -0.04, 0.42, 0.42);
    if (index === 0) {
      ellipse(0.6, 0.15, 0.21, 0.065);
      ellipse(0.6, -0.23, 0.21, 0.065);
      line([0.39, 0.15, 0], [0.39, -0.23, 0]);
      line([0.81, 0.15, 0], [0.81, -0.23, 0]);
    } else {
      rect(0.6, -0.04, 0.42, 0.42);
      line([0.46, -0.12, 0], [0.74, -0.12, 0]);
      line([0.46, -0.17, 0], [0.68, -0.17, 0]);
    }
    line([-0.39, -0.04, 0], [-0.21, -0.04, 0], 1, 0, 0.38);
    line([0.21, -0.04, 0], [0.39, -0.04, 0], 1, 0.55, 0.93);
    // The upper arc shows data returning, or a ledger acknowledgement.
    line([0.6, 0.22, 0], [0.6, 0.39, 0], 1, 0.93, 1);
    line([0.6, 0.39, 0], [-0.6, 0.39, 0], 1, 0, 0.75);
    line([-0.6, 0.39, 0], [-0.6, 0.18, 0], 1, 0.75, 1);
  } else if (index === 1) {
    const { route, wall, cols, rows } = findRoute();
    const point = (x, y) => [
      (x / (cols - 1) - 0.5) * 1.65,
      (0.5 - y / (rows - 1)) * 1.14,
      0,
    ];
    for (let x = 0; x < cols; x++)
      for (let y = 0; y < rows; y++) {
        const p = point(x, y),
          r = 0.009;
        if (wall(x, y)) {
          for (let k = -2; k <= 2; k++)
            line(
              [p[0] - 0.035, p[1] + k * 0.017, 0],
              [p[0] + 0.035, p[1] + k * 0.017, 0],
              3,
            );
        } else line([p[0] - r, p[1], 0], [p[0] + r, p[1], 0], 4);
      }
    for (let i = 0; i < route.length - 1; i++)
      line(
        point(...route[i]),
        point(...route[i + 1]),
        1,
        i / (route.length - 1),
        (i + 1) / (route.length - 1),
      );
  } else {
    const project = (x, z) => [x + z * 0.35, -0.46 + z * 0.18, 0];
    for (let j = 0; j <= 8; j++) {
      const t = -0.65 + (j / 8) * 1.3;
      line(project(t, -0.55), project(t, 0.55), 4);
      line(project(-0.65, t * 0.85), project(0.65, t * 0.85), 4);
    }
    const p = [];
    for (const x of [-0.27, 0.27])
      for (const y of [-0.27, 0.27])
        for (const z of [-0.27, 0.27]) p.push([x, y + 0.17, z]);
    for (let i = 0; i < p.length; i++)
      for (let j = i + 1; j < p.length; j++)
        if (p[i].filter((v, k) => v !== p[j][k]).length === 1)
          line(p[i], p[j], 2);
    line([0, -0.4, 0], [0, -0.15, 0], 1, 0, 1);
  }
  let total = 0;
  for (const s of segments) {
    total += s.length;
    s.limit = total;
  }
  const target = new Float32Array(count * 3),
    kind = new Float32Array(count),
    flow = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const pick = random() * total;
    let lo = 0,
      hi = segments.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (segments[mid].limit < pick) lo = mid + 1;
      else hi = mid;
    }
    const s = segments[lo],
      t = random();
    for (let j = 0; j < 3; j++)
      target[i * 3 + j] =
        s.a[j] + (s.b[j] - s.a[j]) * t + (j < 2 ? (random() - 0.5) * 0.003 : 0);
    kind[i] = s.kind;
    flow[i] = s.flow < 0 ? -1 : s.flow + (s.end - s.flow) * t;
  }
  return { target, kind, flow };
}
