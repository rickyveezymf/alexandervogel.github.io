"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface HumanoidSceneProps {
  onHeadClick: () => void;
  onTorsoClick: () => void;
}

function buildHumanoid(): {
  group: THREE.Group;
  clickables: { mesh: THREE.Mesh; zone: "head" | "torso" }[];
} {
  const group = new THREE.Group();
  const clickables: { mesh: THREE.Mesh; zone: "head" | "torso" }[] = [];

  const skinMat = new THREE.MeshPhongMaterial({ color: 0xd4c5a9, shininess: 30 });
  const darkMat = new THREE.MeshPhongMaterial({ color: 0x1a2060, shininess: 20 });
  const goldMat = new THREE.MeshPhongMaterial({ color: 0xc9a84c, shininess: 60 });

  // Head
  const headGeo = new THREE.SphereGeometry(0.28, 16, 16);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.set(0, 2.1, 0);
  head.castShadow = true;
  group.add(head);
  clickables.push({ mesh: head, zone: "head" });

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.09, 0.1, 0.2, 12);
  const neck = new THREE.Mesh(neckGeo, skinMat);
  neck.position.set(0, 1.78, 0);
  group.add(neck);

  // Torso
  const torsoGeo = new THREE.BoxGeometry(0.72, 1.0, 0.38);
  const torso = new THREE.Mesh(torsoGeo, darkMat);
  torso.position.set(0, 1.18, 0);
  torso.castShadow = true;
  group.add(torso);
  clickables.push({ mesh: torso, zone: "torso" });

  // Belt / accent
  const beltGeo = new THREE.BoxGeometry(0.74, 0.1, 0.4);
  const belt = new THREE.Mesh(beltGeo, goldMat);
  belt.position.set(0, 0.67, 0);
  group.add(belt);

  // Hips
  const hipsGeo = new THREE.BoxGeometry(0.66, 0.28, 0.36);
  const hips = new THREE.Mesh(hipsGeo, darkMat);
  hips.position.set(0, 0.5, 0);
  group.add(hips);

  // Arms (upper + lower + hand)
  const buildArm = (side: 1 | -1) => {
    // Shoulder
    const shoulderGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const shoulder = new THREE.Mesh(shoulderGeo, skinMat);
    shoulder.position.set(side * 0.46, 1.58, 0);
    group.add(shoulder);

    // Upper arm
    const upperArmGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.52, 12);
    const upperArm = new THREE.Mesh(upperArmGeo, darkMat);
    upperArm.position.set(side * 0.56, 1.3, 0);
    upperArm.rotation.z = side * 0.18;
    group.add(upperArm);

    // Elbow
    const elbowGeo = new THREE.SphereGeometry(0.09, 10, 10);
    const elbow = new THREE.Mesh(elbowGeo, skinMat);
    elbow.position.set(side * 0.64, 1.04, 0);
    group.add(elbow);

    // Lower arm
    const lowerArmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.48, 12);
    const lowerArm = new THREE.Mesh(lowerArmGeo, skinMat);
    lowerArm.position.set(side * 0.7, 0.78, 0);
    lowerArm.rotation.z = side * 0.12;
    group.add(lowerArm);

    // Hand
    const handGeo = new THREE.BoxGeometry(0.14, 0.18, 0.09);
    const hand = new THREE.Mesh(handGeo, skinMat);
    hand.position.set(side * 0.76, 0.53, 0);
    group.add(hand);
  };

  buildArm(1);
  buildArm(-1);

  // Legs
  const buildLeg = (side: 1 | -1) => {
    // Upper leg
    const upperLegGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.58, 12);
    const upperLeg = new THREE.Mesh(upperLegGeo, darkMat);
    upperLeg.position.set(side * 0.2, 0.06, 0);
    group.add(upperLeg);

    // Knee
    const kneeGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const knee = new THREE.Mesh(kneeGeo, skinMat);
    knee.position.set(side * 0.2, -0.26, 0);
    group.add(knee);

    // Lower leg
    const lowerLegGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.56, 12);
    const lowerLeg = new THREE.Mesh(lowerLegGeo, darkMat);
    lowerLeg.position.set(side * 0.2, -0.56, 0);
    group.add(lowerLeg);

    // Foot
    const footGeo = new THREE.BoxGeometry(0.18, 0.1, 0.3);
    const foot = new THREE.Mesh(footGeo, goldMat);
    foot.position.set(side * 0.2, -0.87, 0.06);
    group.add(foot);
  };

  buildLeg(1);
  buildLeg(-1);

  return { group, clickables };
}

export default function HumanoidScene({ onHeadClick, onTorsoClick }: HumanoidSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f2c);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3, 5, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Gold rim light
    const rimLight = new THREE.PointLight(0xc9a84c, 0.8, 12);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Humanoid
    const { group, clickables } = buildHumanoid();
    group.position.y = -1.1;
    scene.add(group);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 8;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseDownPos.x;
      const dy = e.clientY - mouseDownPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 4) isDragging = true;
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isDragging) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const allMeshes = clickables.map((c) => c.mesh);
      const hits = raycaster.intersectObjects(allMeshes);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const entry = clickables.find((c) => c.mesh === hit);
        if (entry?.zone === "head") onHeadClick();
        else if (entry?.zone === "torso") onTorsoClick();
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);

    // Cursor feedback
    renderer.domElement.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(clickables.map((c) => c.mesh));
      renderer.domElement.style.cursor = hits.length > 0 ? "pointer" : "grab";
    });

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
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHeadClick, onTorsoClick]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
