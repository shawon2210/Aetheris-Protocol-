'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EARTH_VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const EARTH_FRAGMENT_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform vec3 uSunPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 10; i++) {
      v += a * noise(p);
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 lightDir = normalize(uSunPos);
    float diff = max(dot(vNormal, lightDir), 0.0);

    float n = fbm(vUv * 20.0);

    vec3 deepOcean = vec3(0.005, 0.02, 0.08);
    vec3 ocean = vec3(0.01, 0.05, 0.18);
    vec3 land = vec3(0.08, 0.25, 0.1);
    vec3 mountains = vec3(0.4, 0.4, 0.35);
    vec3 ice = vec3(0.95, 0.98, 1.0);

    vec3 waterColor = mix(deepOcean, ocean, smoothstep(0.2, 0.45, n));
    vec3 terrainColor = mix(land, mountains, smoothstep(0.55, 0.8, n));
    terrainColor = mix(terrainColor, ice, smoothstep(0.88, 0.95, n));

    vec3 color = mix(waterColor, terrainColor, smoothstep(0.495, 0.505, n));

    float spec = pow(max(dot(reflect(-lightDir, vNormal), normalize(vViewPosition)), 0.0), 60.0);
    if (n < 0.5) color += vec3(0.6, 0.8, 1.0) * spec * 0.7;

    float nightFactor = smoothstep(0.1, -0.1, dot(vNormal, lightDir));
    float cityMask = step(0.95, hash(vUv * 1200.0 + n * 0.02)) * step(0.51, n);
    vec3 cityLights = vec3(1.0, 0.95, 0.7) * cityMask * nightFactor * 3.0;

    float rim = 1.0 - max(dot(vNormal, normalize(vViewPosition)), 0.0);
    rim = pow(rim, 8.0);
    vec3 rimGlow = vec3(0.1, 0.7, 1.0) * rim * (diff * 0.7 + 0.3);

    vec3 finalColor = color * (diff * 1.4 + 0.05) + cityLights + rimGlow;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const CLOUD_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CLOUD_FRAGMENT_SHADER = `
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 8; i++) { v += a * noise(p); p *= 2.4; a *= 0.5; }
    return v;
  }

  void main() {
    float c = fbm(vUv * 8.0 + vec2(uTime * 0.002, 0.0));
    float mask = smoothstep(0.5, 0.85, c);
    gl_FragColor = vec4(1.0, 1.0, 1.0, mask * 0.8);
  }
`;

const ATMOSPHERE_VERTEX_SHADER = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT_SHADER = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.85 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 8.0);
    gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0) * intensity;
  }
`;

export function EarthScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dimensions = {
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      dimensions.width / dimensions.height,
      0.1,
      1000,
    );
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunPos: { value: new THREE.Vector3(5, 2, 5) },
      },
      vertexShader: EARTH_VERTEX_SHADER,
      fragmentShader: EARTH_FRAGMENT_SHADER,
    });

    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 512, 512),
      earthMaterial,
    );
    earthGroup.add(earthMesh);

    const cloudMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: CLOUD_VERTEX_SHADER,
      fragmentShader: CLOUD_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
    });

    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.03, 512, 512),
      cloudMaterial,
    );
    earthGroup.add(cloudMesh);

    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: ATMOSPHERE_VERTEX_SHADER,
      fragmentShader: ATMOSPHERE_FRAGMENT_SHADER,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 512, 512),
      atmosphereMaterial,
    );
    scene.add(atmosphereMesh);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 15000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 150;
    }
    starsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const starMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starMesh);

    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetRotationY =
        ((event.clientX - dimensions.width / 2) / (dimensions.width / 2)) *
        0.8;
      targetRotationX =
        ((event.clientY - dimensions.height / 2) / (dimensions.height / 2)) *
        0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      dimensions.width = container.clientWidth || window.innerWidth;
      dimensions.height = container.clientHeight || window.innerHeight;
      camera.aspect = dimensions.width / dimensions.height;
      camera.updateProjectionMatrix();
      renderer.setSize(dimensions.width, dimensions.height);
    };
    window.addEventListener('resize', handleResize);

    let frameId = 0;
    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.0005;
      cloudMesh.rotation.y += 0.0008;
      earthGroup.rotation.y += (targetRotationY - earthGroup.rotation.y) * 0.08;
      earthGroup.rotation.x += (targetRotationX - earthGroup.rotation.x) * 0.08;
      earthMaterial.uniforms.uTime.value = time * 0.001;
      cloudMaterial.uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      earthMesh.geometry.dispose();
      earthMaterial.dispose();
      cloudMesh.geometry.dispose();
      cloudMaterial.dispose();
      atmosphereMesh.geometry.dispose();
      atmosphereMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="earth-stage" />;
}
