import React, { useRef, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SkinDTO from 'types/SkinDTO';
import {
  getSkinMaterialPath,
  getSkinMeshPath,
  normalizeRoot,
  configureMaterial
} from 'services/viewport';

import './skin-viewport.scss';

type Props = {
  skin: SkinDTO;
} & React.ComponentProps<'div'>;

const SkinViewport: React.FC<Props> = ({ skin, className, ...restProps }) => {
  const container = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene>();
  const camera = useRef<THREE.PerspectiveCamera>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const model = useRef<THREE.Object3D>();
  const controls = useRef<OrbitControls>();
  const frame = useRef<number>();

  const setup = useCallback(() => {
    if (container.current) {
      const { clientWidth: width, clientHeight: height } = container.current;
      scene.current = new THREE.Scene();
      camera.current = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      camera.current.position.z = 3;
      renderer.current = new THREE.WebGLRenderer({ alpha: true });
      renderer.current.setSize(width, height);
      scene.current.add(new THREE.AmbientLight());
      controls.current = new OrbitControls(
        camera.current,
        renderer.current.domElement
      );
      controls.current.enablePan = false;

      container.current.appendChild(renderer.current.domElement);
    }
  }, []);

  const load = useCallback(() => {
    if (!skin) return;

    // Load material and mesh.
    new MTLLoader().load(getSkinMaterialPath(skin), materials => {
      materials.preload();
      materials.getAsArray().forEach(configureMaterial);

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(getSkinMeshPath(skin), mesh => {
        normalizeRoot(mesh);

        if (scene.current) {
          model.current = mesh;
          scene.current.add(model.current);
        }
      });
    });
  }, [skin]);

  const animate = useCallback(() => {
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    frame.current = requestAnimationFrame(animate);
  }, []);

  const clean = useCallback(() => {
    if (container.current && renderer.current && frame.current) {
      container.current.removeChild(renderer.current.domElement);
      cancelAnimationFrame(frame.current);
    }
  }, []);

  useEffect(() => {
    setup();
    load();
    animate();
    return clean;
  }, [animate, clean, load, setup]);

  useEffect(() => {
    function handleResize() {
      if (container.current && renderer.current && camera.current) {
        const { clientWidth: width, clientHeight: height } = container.current;
        renderer.current.setSize(width, height);
        camera.current.aspect = width / height;
        camera.current.updateProjectionMatrix();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={clsx('skin-viewport', className)}
      ref={container}
      {...restProps}
    />
  );
};

export default SkinViewport;
