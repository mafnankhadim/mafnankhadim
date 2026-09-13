import { useEffect, useRef } from "react";

// WebGL backdrop for the banner: a faceted core inside a rotating wireframe
// shell, wrapped in a drifting particle field, all easing toward the pointer.
//
// three.js is imported dynamically so it lands in its own chunk instead of the
// entry bundle — first paint never waits on ~600kB of renderer. Everything
// degrades quietly: `prefers-reduced-motion`, a failed chunk load and a missing
// WebGL context all just leave the `.hero-glow` CSS gradient on show.
export default function HeroScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The effect can unmount (or Strict Mode can re-run it) before the dynamic
    // import settles, so every teardown path funnels through these two.
    let disposed = false;
    let teardown = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;
        teardown = build(THREE, host);
      })
      .catch(() => {
        /* No 3D layer — the gradient backdrop stands on its own. */
      });

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return <div className="hero-canvas" ref={hostRef} aria-hidden="true" />;
}

// Brand green easing into teal — the same two stops the CSS gradients use, so
// the canvas reads as part of the page rather than a pasted-in demo.
const ACCENT_HEX = 0x5bbc2e;
const ACCENT2_HEX = 0x2ee6c5;

const PARTICLE_COUNT = 900;

// Builds the scene and returns its teardown. Split out of the hook so the
// dispose list sits next to the allocations it mirrors.
function build(THREE, host) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  // Retina would quadruple the fragment count for a backdrop nobody inspects.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    host.clientWidth / Math.max(host.clientHeight, 1),
    0.1,
    100
  );
  camera.position.z = 8;

  const accent = new THREE.Color(ACCENT_HEX);
  const accent2 = new THREE.Color(ACCENT2_HEX);

  // One group for everything the pointer steers, so parallax is a single write.
  const pivot = new THREE.Group();
  scene.add(pivot);

  const shellGeo = new THREE.IcosahedronGeometry(2.15, 1);
  const shellMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.38,
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  pivot.add(shell);

  const coreGeo = new THREE.IcosahedronGeometry(1.3, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    // Dark and highly metallic: the facets only read as facets when most of
    // the surface stays near-black and the lights pick out a few of them. A
    // lighter base flattened the whole solid into one green blob.
    color: 0x080f16,
    roughness: 0.22,
    metalness: 1,
    flatShading: true,
    emissive: accent.clone().multiplyScalar(0.045),
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  pivot.add(core);

  scene.add(new THREE.AmbientLight(0x2a3b4d, 0.55));
  // r155+ made lights physically correct, so raw intensities became
  // distance-dependent. decay = 0 pins the old linear behaviour and keeps these
  // numbers meaning the same thing across three releases.
  const keyLight = new THREE.PointLight(ACCENT_HEX, 2.6);
  keyLight.decay = 0;
  keyLight.position.set(4, 3, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(ACCENT2_HEX, 2.1);
  rimLight.decay = 0;
  rimLight.position.set(-5, -2.5, 3);
  scene.add(rimLight);

  // Particles sit in a spherical shell rather than a cube: the solid stays in
  // a clear pocket at the centre and the field reads as depth around it.
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const scratch = new THREE.Color();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 4.8 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    // acos of a uniform value, so points spread evenly over the sphere instead
    // of bunching at the poles.
    const phi = Math.acos(2 * Math.random() - 1);
    const sinPhi = Math.sin(phi);
    positions[i * 3] = radius * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    scratch.copy(accent).lerp(accent2, Math.random());
    colors[i * 3] = scratch.r;
    colors[i * 3 + 1] = scratch.g;
    colors[i * 3 + 2] = scratch.b;
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dustGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    // Additive with depthWrite off so overlapping points glow instead of
    // punching depth holes in each other.
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // Park the solid in the hero's right-hand space, clear of the headline, and
  // size it against the viewport rather than a fixed scale. On narrow/portrait
  // viewports the copy is centred and full-width, so the solid centres too and
  // shrinks to sit behind it.
  const placeSolid = () => {
    const vFov = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    const wide = camera.aspect > 1.15;
    pivot.position.x = wide ? visibleWidth * 0.23 : 0;
    pivot.position.y = wide ? 0 : visibleHeight * 0.1;
    pivot.scale.setScalar(wide ? 0.82 : 0.55);
  };
  placeSolid();

  // --- pointer parallax -----------------------------------------------------
  // Target vs. current, eased every frame, so the motion trails the cursor
  // instead of snapping to it.
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  const onPointerMove = (event) => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };
  // Listen on the window, not the canvas: the canvas sits behind the banner
  // content, so it would never see a pointer crossing the headline.
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // --- render loop ----------------------------------------------------------
  let frame = 0;
  let running = false;
  // Wall-clock elapsed seconds since the scene was built. THREE.Clock is
  // deprecated in r186 (it warns in the console and points at THREE.Timer),
  // and all this loop ever needed was a monotonic elapsed time — which also
  // keeps advancing while the loop is paused, so the rotation resumes where
  // the motion would have carried it rather than snapping back.
  const startedAt = performance.now();

  const render = () => {
    if (!running) return;
    frame = requestAnimationFrame(render);
    const elapsed = (performance.now() - startedAt) / 1000;

    current.x += (target.x - current.x) * 0.045;
    current.y += (target.y - current.y) * 0.045;

    shell.rotation.y = elapsed * 0.16;
    shell.rotation.x = elapsed * 0.09;
    // Counter-rotating core, so the two solids visibly separate in depth.
    core.rotation.y = -elapsed * 0.22;
    core.rotation.z = elapsed * 0.12;

    pivot.rotation.y += (current.x * 0.45 - pivot.rotation.y) * 0.08;
    pivot.rotation.x += (current.y * 0.3 - pivot.rotation.x) * 0.08;

    dust.rotation.y = elapsed * 0.03 + current.x * 0.12;
    dust.rotation.x = current.y * 0.08;

    renderer.render(scene, camera);
  };

  const start = () => {
    if (running) return;
    running = true;
    frame = requestAnimationFrame(render);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  // Only animate while the banner is actually on screen and the tab is
  // foregrounded — a hero that keeps rendering behind five sections of scroll
  // is pure battery drain.
  let onScreen = true;
  const sync = () => {
    if (onScreen && !document.hidden) start();
    else stop();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    },
    { threshold: 0 }
  );
  observer.observe(host);

  document.addEventListener("visibilitychange", sync);

  const resizeObserver = new ResizeObserver(() => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    placeSolid();
    renderer.setSize(width, height, false);
    // A resize while paused would otherwise leave a stretched last frame.
    if (!running) renderer.render(scene, camera);
  });
  resizeObserver.observe(host);

  sync();

  return () => {
    stop();
    observer.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", sync);
    window.removeEventListener("pointermove", onPointerMove);

    // GPU resources are not garbage collected — every geometry, material and
    // the context itself has to go back explicitly.
    shellGeo.dispose();
    shellMat.dispose();
    coreGeo.dispose();
    coreMat.dispose();
    dustGeo.dispose();
    dustMat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
