import * as THREE from "three";
import { animation } from "../content/animation.js";
import { makeLayout } from "./particle-layouts.js";
import { selectProject } from "./project-focus.js";

export function startUniverse(canvas, hero, slots) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  try {
    const events = new AbortController();
    const listen = (target, type, handler, options = {}) =>
      target.addEventListener(type, handler, {
        ...options,
        signal: events.signal,
      });
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x0d0e12, 0);
    const scene = new THREE.Scene(),
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2000);
    camera.position.z = 1000;
    const mobile = matchMedia("(max-width:760px)").matches,
      count = mobile ? animation.mobileParticles : animation.desktopParticles;
    let seed = 1197;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const positions = new Float32Array(count * 3),
      scatter = new Float32Array(count * 3),
      color = new Float32Array(count * 3),
      size = new Float32Array(count),
      phase = new Float32Array(count),
      emission = new Float32Array(count);
    const cyan = new THREE.Color("#64d8ee"),
      copper = new THREE.Color("#f39a77"),
      violet = new THREE.Color("#9d83d6"),
      c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const strand = i % 64,
        t = rand(),
        filament = i % 10 < 6,
        gas = i % 10 < 9;
      let radius, angle;
      if (filament) {
        radius = 0.25 + Math.pow(t, 0.7) * 1.35;
        angle =
          (strand / 64) * Math.PI * 2 +
          0.22 * Math.sin(t * 9 + strand * 0.71) +
          0.085 * Math.sin(t * 28 + strand);
        radius += (rand() - 0.5) * 0.025;
      } else {
        radius = Math.pow(rand(), gas ? 0.78 : 0.4) * (gas ? 1.45 : 2.1);
        angle = rand() * Math.PI * 2;
      }
      let x = Math.cos(angle) * radius * 1.22,
        y = Math.sin(angle) * radius * 0.76;
      y += Math.sin(x * 3.1) * 0.09 + Math.sin(angle * 5 + radius * 4) * 0.055;
      positions[i * 3] = x * Math.cos(0.22) - y * Math.sin(0.22);
      positions[i * 3 + 1] = x * Math.sin(0.22) + y * Math.cos(0.22);
      positions[i * 3 + 2] = (rand() - 0.5) * 0.4;
      scatter[i * 3] = (rand() - 0.5) * 2.6;
      scatter[i * 3 + 1] = (rand() - 0.5) * 2.6;
      scatter[i * 3 + 2] = rand();
      c.copy(cyan).lerp(
        filament ? copper : violet,
        Math.min(1, Math.max(0, (radius - 0.35) / 1.1)),
      );
      c.toArray(color, i * 3);
      size[i] = filament
        ? 0.7 + rand() * 1.1
        : gas
          ? 2 + rand() * 2.5
          : 0.7 + rand() * 1.2;
      emission[i] = filament ? 1 : gas ? 0.14 : 0.4;
      phase[i] = rand() * 6.283;
    }
    const layouts = slots.map((slot) =>
      makeLayout(Number(slot.dataset.particleProject), count, rand),
    );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geometry.setAttribute("aEmission", new THREE.BufferAttribute(emission, 1));
    geometry.setAttribute(
      "aTarget",
      new THREE.BufferAttribute(new Float32Array(layouts[0].target), 3),
    );
    geometry.setAttribute(
      "aKind",
      new THREE.BufferAttribute(new Float32Array(layouts[0].kind), 1),
    );
    geometry.setAttribute(
      "aFlow",
      new THREE.BufferAttribute(new Float32Array(layouts[0].flow), 1),
    );
    const uniforms = {
      uTime: { value: 0 },
      uDpr: { value: 1 },
      uGather: { value: 0 },
      uScatter: { value: 0 },
      uOpacity: { value: 1 },
      uScroll: { value: 0 },
      uScale: { value: 450 },
      uViewport: { value: new THREE.Vector2(1000, 800) },
      uCenter: { value: new THREE.Vector2() },
      uBox: { value: new THREE.Vector2(260, 180) },
      uHalo: { value: 0 },
      uIgnition: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uPointerStrength: { value: 0 },
      uPointerRadius: { value: animation.pointerRadius },
      uPointerForce: { value: animation.pointerForce },
    };
    const vertexShader = `attribute vec3 aTarget;attribute vec3 aScatter;attribute vec3 aColor;attribute float aSize;attribute float aPhase;attribute float aKind;attribute float aFlow;attribute float aEmission;
 uniform float uTime;uniform float uDpr;uniform float uGather;uniform float uScatter;uniform float uOpacity;uniform float uScroll;uniform float uScale;uniform float uHalo;uniform float uIgnition;uniform vec2 uPointer;uniform float uPointerStrength;uniform float uPointerRadius;uniform float uPointerForce;uniform vec2 uViewport;uniform vec2 uCenter;uniform vec2 uBox;
 varying vec3 vColor;varying float vAlpha;varying float vSpark;
 void main(){
  float breath=1.+sin(uTime*.17)*.012+uIgnition*.025;
  vec2 nebula=position.xy*uScale*breath;
  nebula.x+=sin(position.y*5.+uTime*.34)*5.;nebula.y+=sin(position.x*4.+uTime*.29)*4.;
  // A soft local nudge, capped below ten CSS pixels, shared by stars and halos.
  vec2 away=(nebula-uPointer)/max(uPointerRadius,1.);
  nebula+=away*exp(-dot(away,away)*2.)*uPointerForce*uPointerStrength*(1.-uScatter)*(1.-uGather);
  vec2 dispersed=aScatter.xy*uViewport*.65;dispersed+=vec2(sin(aPhase+uTime*.12),cos(aPhase+uTime*.15))*18.;
  vec2 source=mix(nebula,dispersed,uScatter);
  vec3 form=aTarget;
  if(aKind>1.5&&aKind<2.5){float a=uTime*.38;float x=form.x*cos(a)-form.z*sin(a);float z=form.x*sin(a)+form.z*cos(a);form.x=x+z*.45;form.y+=z*.25+sin(uTime*.7)*.035;}
  vec2 target=form.xy*uBox+uCenter;
  vec2 p=mix(source,target,uGather);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,0.,1.);
  float pulse=0.;if(aFlow>=0.){float d=abs(fract(uTime*.19)-aFlow);pulse=exp(-d*d*450.);}
  vec3 projectColor=mix(vec3(.20,.62,.90),vec3(.45,1.,.78),pulse);
  float alpha=.30;
  if(aKind>2.5&&aKind<3.5){projectColor=vec3(.28,.38,.49);alpha=.18;}
  if(aKind>3.5){projectColor=vec3(.15,.36,.43);alpha=.10;}
  if(aFlow>=0.)alpha=.12+pulse*.8;
  // Independent, smooth glints: visible at rest, never a synchronized flash.
  float twinkle=.5+.5*sin(uTime*(1.1+fract(aPhase*3.7)*.8)+aPhase);
  float sparkle=pow(twinkle,12.)*step(.84,fract(aPhase*17.3))*step(.3,aEmission);
  vSpark=sparkle*(1.-uGather);
  vec3 starColor=mix(aColor,vec3(.80,1.,.97),sparkle*.78);
  vColor=mix(starColor,projectColor,uGather);
  float lightFront=uScroll*2.8;
  float wave=exp(-pow(length(position.xy)-lightFront,2.)*12.);
  float illumination=.65+uScroll*.4+wave*1.15+uIgnition*.7;
  float starAlpha=(.22+.23*twinkle+sparkle*2.1)*aEmission*illumination;
  vAlpha=mix(starAlpha*uOpacity,alpha,uGather);
  gl_PointSize=mix(aSize,min(aSize,1.7),uGather)*uDpr*mix(1.8,1.4,uGather)*(1.+uHalo*3.5)*(1.+pulse*uGather*.65)*(1.+vSpark*2.2);
  vAlpha*=mix(1.,.085,uHalo);
 }`;
    const fragmentShader = `varying vec3 vColor;varying float vAlpha;varying float vSpark;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float glow=1.-smoothstep(.01,.5,d);
  vec2 uv=abs(gl_PointCoord-.5);
  float rays=(exp(-uv.x*95.)+exp(-uv.y*95.))*pow(1.-d*2.,2.);
  glow+=rays*vSpark*.5;
  gl_FragColor=vec4(vColor,glow*vAlpha);}`;
    const makeMaterial = (halo) =>
      new THREE.ShaderMaterial({
        uniforms: { ...uniforms, uHalo: { value: halo } },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    const mainMaterial = makeMaterial(0),
      haloMaterial = makeMaterial(1);
    const glow = new THREE.Points(geometry, haloMaterial),
      points = new THREE.Points(geometry, mainMaterial);
    glow.frustumCulled = points.frustumCulled = false;
    scene.add(glow, points);
    let width = innerWidth,
      height = innerHeight,
      raf = 0,
      last = 0,
      time = 0,
      current = 0,
      desired = -1,
      gather = 0,
      scatterAmount = 0,
      opacity = 1,
      scrollEnergy = 0,
      lastScrollY = scrollY,
      dirty = true,
      available = true;
    let targetScatter = 0,
      targetOpacity = 1,
      scrollProgress = 0,
      slotRects = [];
    const pointerTarget = new THREE.Vector2(),
      pointerPosition = new THREE.Vector2();
    let pointerInside = false,
      pointerStrength = 0;
    const clamp = (n) => Math.max(0, Math.min(1, n));
    const smooth = (n) => {
      n = clamp(n);
      return n * n * (3 - 2 * n);
    };
    function layout() {
      dirty = false;
      const heroRect = hero.getBoundingClientRect();
      scrollProgress = clamp(-heroRect.top / heroRect.height);
      targetScatter = smooth((scrollProgress - 0.12) / 0.88);
      targetOpacity = 1 - scrollProgress * 0.82;
      slotRects = slots.map((s) => s.getBoundingClientRect());
      desired = selectProject(slotRects, height);
      if (desired >= 0) {
        targetScatter = 1;
        targetOpacity = 0.075;
      }
      const lastRect = slotRects[slotRects.length - 1];
      if (lastRect && lastRect.bottom < 0) targetOpacity = 0.24;
      slots.forEach((s, i) => (s.dataset.active = String(i === desired)));
    }
    function bind(index) {
      current = index;
      const shape = layouts[index];
      for (const [name, array] of [
        ["aTarget", shape.target],
        ["aKind", shape.kind],
        ["aFlow", shape.flow],
      ]) {
        const attribute = geometry.getAttribute(name);
        attribute.array.set(array);
        attribute.needsUpdate = true;
      }
    }
    function render(delta = 0) {
      if (dirty) layout();
      const instant = reduced.matches,
        follow = instant ? 1 : 1 - Math.exp(-delta * 8);
      if (desired >= 0 && desired !== current) {
        if (gather < 0.035 || instant) {
          bind(desired);
        }
      }

      let aim = 0;
      if (desired === current && desired >= 0) {
        const r = slotRects[current];
        aim =
          smooth((height * 1.08 - r.top) / (height * 0.38)) *
          smooth((r.bottom - height * 0.04) / (height * 0.24));
      }
      gather += (aim - gather) * follow;
      scatterAmount += (targetScatter - scatterAmount) * follow;
      opacity += (targetOpacity - opacity) * follow;
      scrollEnergy *= Math.exp(-delta * 2.4);
      const rect = slotRects[current];
      if (rect) {
        uniforms.uCenter.value.set(
          rect.left + rect.width / 2 - width / 2,
          height / 2 - rect.top - rect.height / 2,
        );
        uniforms.uBox.value.set(rect.width / 2, rect.height / 2);
      }
      uniforms.uTime.value = time;
      uniforms.uGather.value = gather;
      uniforms.uScatter.value = instant ? targetScatter : scatterAmount;
      uniforms.uOpacity.value = opacity;
      uniforms.uScroll.value = scrollProgress;
      uniforms.uIgnition.value = instant ? 0 : scrollEnergy;
      const pointerFollow = 1 - Math.exp(-delta * animation.pointerFollow);
      pointerPosition.lerp(pointerTarget, pointerFollow);
      const pointerAim =
        !instant && pointerInside ? 1 - smooth(scrollProgress / 0.55) : 0;
      pointerStrength +=
        (pointerAim - pointerStrength) *
        (1 - Math.exp(-delta * animation.pointerEase));
      uniforms.uPointer.value.set(
        pointerPosition.x - width / 2,
        height / 2 - pointerPosition.y,
      );
      uniforms.uPointerStrength.value = instant ? 0 : pointerStrength;
      renderer.render(scene, camera);
    }
    function loop(now) {
      raf = 0;
      if (document.hidden || !available) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      if (!reduced.matches) time += dt;
      render(dt);
      if (!reduced.matches) raf = requestAnimationFrame(loop);
    }
    function schedule() {
      if (!raf && !document.hidden && available)
        raf = requestAnimationFrame(loop);
    }
    function resize() {
      width = innerWidth;
      height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      uniforms.uDpr.value = dpr;
      uniforms.uScale.value = Math.min(width, height) * 0.52;
      uniforms.uViewport.value.set(width, height);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      dirty = true;
      schedule();
    }
    listen(
      window,
      "scroll",
      () => {
        const down = Math.max(0, scrollY - lastScrollY);
        scrollEnergy = Math.min(1, scrollEnergy + down * 0.005);
        lastScrollY = scrollY;
        dirty = true;
        schedule();
      },
      { passive: true },
    );
    listen(window, "resize", resize);

    listen(
      hero,
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse" || reduced.matches) return;
        pointerTarget.set(event.clientX, event.clientY);
        if (!pointerInside && pointerStrength < 0.01)
          pointerPosition.copy(pointerTarget);
        pointerInside = true;
        schedule();
      },
      { passive: true },
    );
    const releasePointer = () => {
      pointerInside = false;
    };
    listen(hero, "pointerleave", releasePointer);
    listen(hero, "pointercancel", releasePointer);
    listen(window, "blur", releasePointer);
    const observer = new ResizeObserver(() => {
      dirty = true;
      schedule();
    });
    observer.observe(hero.closest("main"));
    listen(reduced, "change", () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      dirty = true;
      schedule();
    });
    listen(document, "visibilitychange", () => {
      releasePointer();
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      if (!document.hidden) {
        dirty = true;
        schedule();
      }
    });
    listen(canvas, "webglcontextlost", (event) => {
      event.preventDefault();
      available = false;
      cancelAnimationFrame(raf);
      document.body.classList.remove("particles-ready");
      document.body.classList.add("background-unavailable");
    });
    listen(window, "pagehide", () => {
      cancelAnimationFrame(raf);
      raf = 0;
    });
    listen(window, "pageshow", () => {
      dirty = true;
      last = 0;
      schedule();
    });
    document.body.classList.add("particles-ready");
    resize();
    return () => {
      available = false;
      cancelAnimationFrame(raf);
      events.abort();
      observer.disconnect();
      geometry.dispose();
      mainMaterial.dispose();
      haloMaterial.dispose();
      renderer.dispose();
      document.body.classList.remove("particles-ready");
    };
  } catch (error) {
    document.body.classList.remove("particles-ready");
    document.body.classList.add("background-unavailable");
    console.warn("Portfolio particles unavailable:", error);
  }
}
