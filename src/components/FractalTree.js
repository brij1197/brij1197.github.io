import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

let angle;

const Sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(400, 400, "transparent");
    angle = p5.PI / 4;
  };

  p5.draw = () => {
    p5.clear();
    p5.translate(200, p5.height);
    angle = p5.map(p5.sin(p5.frameCount * 0.01), -1, 1, p5.PI / 2, p5.PI / 16); // vary the angle using sin()
    branch(100);
  };

  function branch(len) {
    // Color changes as branches get smaller, using shades of gold
    p5.stroke(lerpColor(p5.color(255, 215, 0), p5.color(218, 165, 32), len / 100));
    p5.line(0, 0, 0, -len);
    p5.translate(0, -len);
    if (len > 4) {
      p5.push();
      p5.rotate(angle);
      branch(len * 0.67);
      p5.pop();
      p5.push();
      p5.rotate(-angle);
      branch(len * 0.67);
      p5.pop();
    }
  }

  function lerpColor(c1, c2, amt) {
    let r = p5.lerp(p5.red(c1), p5.red(c2), amt);
    let g = p5.lerp(p5.green(c1), p5.green(c2), amt);
    let b = p5.lerp(p5.blue(c1), p5.blue(c2), amt);
    return p5.color(r, g, b);
  }
};

const FractalTree = () => (
  <div id="fractal-tree">
    <ReactP5Wrapper sketch={Sketch} />
  </div>
);

export default FractalTree;
