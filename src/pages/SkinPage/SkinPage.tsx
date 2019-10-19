import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RouteComponentProps } from 'react-router';

const CONTAINER_STYLE = { width: '100vw', height: '100vh' };

type Props = RouteComponentProps<{ id: string }>;

const SkinPage: React.FC<Props> = ({ match }) => {
  const skinId = useMemo(() => Number(match.params.id), [match.params.id]);
  const container = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene>();
  const camera = useRef<THREE.PerspectiveCamera>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const animateFrame = useRef<number>();

  const setupScene = useCallback(() => {
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
      renderer.current = new THREE.WebGLRenderer();
      renderer.current.setSize(width, height);
      container.current.appendChild(renderer.current.domElement);
    }
  }, []);

  const configureScene = useCallback(() => {}, []);

  const animate = useCallback(() => {
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
      animateFrame.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    setupScene();
    configureScene();
    animate();
  }, [animate, configureScene, setupScene]);

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

  return <div ref={container} style={CONTAINER_STYLE} />;
};

export default SkinPage;
