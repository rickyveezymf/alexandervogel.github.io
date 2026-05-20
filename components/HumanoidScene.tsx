"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type Zone = "head" | "torso" | "arms" | "legs";

interface HumanoidSceneProps {
  onZoneClick: (zone: Zone) => void;
  onHoverChange: (zone: Zone | null, mouse?: { x: number; y: number }) => void;
}

const BLACK = 0x000000;
const GREY = 0x666666;
const WHITE = 0xffffff;

/**
 * Future: when a body scan is uploaded, replace the meshes inside each named
 * group (headGroup / torsoGroup / armsGroup / legsGroup) with the scan
 * geometry. Apply a shared MeshStandardMaterial via applyZoneMaterial(zone, mat)
 * to project-map textures onto the scan.
 */

type ZoneGroups = Record<Zone, THREE.Group>;

function buildHumanoid(): { root: THREE.Group; zones: ZoneGroups } {
  const root = new THREE.Group();

  const headGroup = new THREE.Group();
  headGroup.name = "headGroup";
  const torsoGroup = new THREE.Group();
  torsoGroup.name = "torsoGroup";
  const armsGroup = new THREE.Group();
  armsGroup.name = "armsGroup";
  const legsGroup = new THREE.Group();
  legsGroup.name = "legsGroup";

  root.add(headGroup, torsoGroup, armsGroup, legsGroup);

  const black = () => new THREE.MeshBasicMaterial({ color: BLACK });

  const addTo = (group: THREE.Group, mesh: THREE.Mesh) => {
    group.add(mesh);
  };

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), black());
  head.position.set(0, 2.1, 0);
  addTo(headGroup, head);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.2, 16), black());
  neck.position.set(0, 1.78, 0);
  addTo(headGroup, neck);

  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.0, 0.38), black());
  torso.position.set(0, 1.18, 0);
  addTo(torsoGroup, torso);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.1, 0.4), black());
  belt.position.set(0, 0.67, 0);
  addTo(torsoGroup, belt);

  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.28, 0.36), black());
  hips.position.set(0, 0.5, 0);
  addTo(torsoGroup, hips);

  // Arms
  const buildArm = (side: 1 | -1) => {
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), black());
    shoulder.position.set(side * 0.46, 1.58, 0);
    addTo(armsGroup, shoulder);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.52, 16), black());
    upperArm.position.set(side * 0.56, 1.3, 0);
    upperArm.rotation.z = side * 0.18;
    addTo(armsGroup, upperArm);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), black());
    elbow.position.set(side * 0.64, 1.04, 0);
    addTo(armsGroup, elbow);

    const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.48, 16), black());
    lowerArm.position.set(side * 0.7, 0.78, 0);
    lowerArm.rotation.z = side * 0.12;
    addTo(armsGroup, lowerArm);

    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.09), black());
    hand.position.set(side * 0.76, 0.53, 0);
    addTo(armsGroup, hand);
  };
  buildArm(1);
  buildArm(-1);

  // Legs
  const buildLeg = (side: 1 | -1) => {
    const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.58, 16), black());
    upperLeg.position.set(side * 0.2, 0.06, 0);
    addTo(legsGroup, upperLeg);

    const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), black());
    knee.position.set(side * 0.2, -0.26, 0);
    addTo(legsGroup, knee);

    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.56, 16), black());
    lowerLeg.position.set(side * 0.2, -0.56, 0);
    addTo(legsGroup, lowerLeg);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.3), black());
    foot.position.set(side * 0.2, -0.87, 0.06);
    addTo(legsGroup, foot);
  };
  buildLeg(1);
  buildLeg(-1);

  return { root, zones: { head: headGroup, torso: torsoGroup, arms: armsGroup, legs: legsGroup } };
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

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(WHITE);

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // MeshBasicMaterial ignores lights — no lights needed for flat silhouette.

    const { root, zones } = buildHumanoid();
    root.position.y = -0.6;
    scene.add(root);

    // Build mesh→zone map for raycasting
    const allMeshes: THREE.Mesh[] = [];
    const meshToZone = new Map<THREE.Mesh, Zone>();
    (Object.keys(zones) as Zone[]).forEach((zone) => {
      zones[zone].traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          allMeshes.push(obj);
          meshToZone.set(obj, zone);
        }
      });
    });

    const setZoneColor = (zone: Zone, hex: number) => {
      zones[zone].traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          (obj.material as THREE.MeshBasicMaterial).color.setHex(hex);
        }
      });
    };

    const clearAllZones = () => {
      (Object.keys(zones) as Zone[]).forEach((z) => setZoneColor(z, BLACK));
    };

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 8;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // Hover + click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredZone: Zone | null = null;
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };

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
      const dx = e.clientX - mouseDownPos.x;
      const dy = e.clientY - mouseDownPos.y;
      if (e.buttons > 0 && Math.sqrt(dx * dx + dy * dy) > 4) isDragging = true;

      const zone = updateRaycast(e.clientX, e.clientY);
      if (zone !== hoveredZone) {
        if (hoveredZone) setZoneColor(hoveredZone, BLACK);
        if (zone) setZoneColor(zone, GREY);
        hoveredZone = zone;
      }
      renderer.domElement.style.cursor = zone ? "pointer" : "grab";
      onHoverChangeRef.current(zone, { x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      clearAllZones();
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

    // Idle rotation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!hoveredZone) root.rotation.y += 0.0015;
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
