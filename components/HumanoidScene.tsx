"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type Zone = "head" | "torso" | "arms" | "legs";

interface HumanoidSceneProps {
  onZoneClick: (zone: Zone) => void;
  onHoverChange: (zone: Zone | null, mouse?: { x: number; y: number }) => void;
}

const INK = 0x0a0a0a;
const INK_SOFT = 0x1f1f1f;
const RUST = 0xb85c38;
const BONE = 0xf5f3ee;

type ZoneMeshes = Record<Zone, THREE.Mesh[]>;

function buildHumanoid(): { group: THREE.Group; zoneMeshes: ZoneMeshes } {
  const group = new THREE.Group();
  const zoneMeshes: ZoneMeshes = { head: [], torso: [], arms: [], legs: [] };

  const skinMat = () => new THREE.MeshStandardMaterial({ color: INK_SOFT, roughness: 0.55, metalness: 0.1 });
  const darkMat = () => new THREE.MeshStandardMaterial({ color: INK, roughness: 0.65, metalness: 0.1 });
  const accentMat = () => new THREE.MeshStandardMaterial({ color: RUST, roughness: 0.45, metalness: 0.2 });

  const add = (zone: Zone, mesh: THREE.Mesh) => {
    group.add(mesh);
    zoneMeshes[zone].push(mesh);
  };

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), skinMat());
  head.position.set(0, 2.1, 0);
  add("head", head);

  // Neck (head zone)
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.2, 16), skinMat());
  neck.position.set(0, 1.78, 0);
  add("head", neck);

  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.0, 0.38), darkMat());
  torso.position.set(0, 1.18, 0);
  add("torso", torso);

  // Belt (rust accent, torso zone)
  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.1, 0.4), accentMat());
  belt.position.set(0, 0.67, 0);
  add("torso", belt);

  // Hips (torso zone)
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.28, 0.36), darkMat());
  hips.position.set(0, 0.5, 0);
  add("torso", hips);

  // Arms
  const buildArm = (side: 1 | -1) => {
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat());
    shoulder.position.set(side * 0.46, 1.58, 0);
    add("arms", shoulder);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.52, 16), darkMat());
    upperArm.position.set(side * 0.56, 1.3, 0);
    upperArm.rotation.z = side * 0.18;
    add("arms", upperArm);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), skinMat());
    elbow.position.set(side * 0.64, 1.04, 0);
    add("arms", elbow);

    const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.48, 16), skinMat());
    lowerArm.position.set(side * 0.7, 0.78, 0);
    lowerArm.rotation.z = side * 0.12;
    add("arms", lowerArm);

    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.09), skinMat());
    hand.position.set(side * 0.76, 0.53, 0);
    add("arms", hand);
  };
  buildArm(1);
  buildArm(-1);

  // Legs
  const buildLeg = (side: 1 | -1) => {
    const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 16), darkMat());
    upperLeg.position.set(side * 0.2, 0.06, 0);
    add("legs", upperLeg);

    const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat());
    knee.position.set(side * 0.2, -0.26, 0);
    add("legs", knee);

    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.56, 16), darkMat());
    lowerLeg.position.set(side * 0.2, -0.56, 0);
    add("legs", lowerLeg);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.3), accentMat());
    foot.position.set(side * 0.2, -0.87, 0.06);
    add("legs", foot);
  };
  buildLeg(1);
  buildLeg(-1);

  return { group, zoneMeshes };
}

export default function HumanoidScene({ onZoneClick, onHoverChange }: HumanoidSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onZoneClickRef = useRef(onZoneClick);
  const onHoverChangeRef = useRef(onHoverChange);

  useEffect(() => {
    onZoneClickRef.current = onZoneClick;
    onHoverChangeRef.current = onHoverChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BONE);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights — softer ambient, ink-friendly
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(RUST, 0.6, 14);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    // Humanoid
    const { group, zoneMeshes } = buildHumanoid();
    group.position.y = -0.6;
    scene.add(group);

    const allMeshes: THREE.Mesh[] = [];
    const meshToZone = new Map<THREE.Mesh, Zone>();
    (Object.keys(zoneMeshes) as Zone[]).forEach((zone) => {
      zoneMeshes[zone].forEach((m) => {
        allMeshes.push(m);
        meshToZone.set(m, zone);
      });
    });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 8;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // Hover + click state
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredZone: Zone | null = null;
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };

    const setZoneEmissive = (zone: Zone, color: number, intensity: number) => {
      zoneMeshes[zone].forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissive.setHex(color);
        mat.emissiveIntensity = intensity;
      });
    };

    const clearAllEmissive = () => {
      (Object.keys(zoneMeshes) as Zone[]).forEach((z) => setZoneEmissive(z, 0x000000, 0));
    };

    const updateRaycast = (clientX: number, clientY: number): Zone | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(allMeshes, false);
      if (hits.length === 0) return null;
      return meshToZone.get(hits[0].object as THREE.Mesh) ?? null;
    };

    const onMouseDown = (e: MouseEvent) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      // drag detection
      const dx = e.clientX - mouseDownPos.x;
      const dy = e.clientY - mouseDownPos.y;
      if (e.buttons > 0 && Math.sqrt(dx * dx + dy * dy) > 4) isDragging = true;

      const zone = updateRaycast(e.clientX, e.clientY);
      if (zone !== hoveredZone) {
        if (hoveredZone) setZoneEmissive(hoveredZone, 0x000000, 0);
        if (zone) setZoneEmissive(zone, RUST, 0.6);
        hoveredZone = zone;
      }
      renderer.domElement.style.cursor = zone ? "pointer" : "grab";
      onHoverChangeRef.current(zone, { x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      clearAllEmissive();
      hoveredZone = null;
      onHoverChangeRef.current(null);
      renderer.domElement.style.cursor = "grab";
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isDragging) return;
      const zone = updateRaycast(e.clientX, e.clientY);
      if (zone) onZoneClickRef.current(zone);
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);
    renderer.domElement.addEventListener("mouseup", onMouseUp);

    // Resize
    const observer = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    observer.observe(container);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseleave", onMouseLeave);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      // Dispose geometries + materials
      allMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
