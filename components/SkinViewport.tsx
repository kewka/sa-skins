import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import SkinData from 'data/SkinData';
import { useCallback, useEffect, useRef } from 'react';
import { Card, IconButton, Stack, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { loadSkinMesh } from 'utils/viewport';

export type SkinViewportProps = {
  onPrev?: () => any;
  onNext?: () => any;
  skin: SkinData;
};

export default function SkinViewport({
  skin,
  onPrev,
  onNext,
}: SkinViewportProps) {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene>();
  const camera = useRef<THREE.PerspectiveCamera>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const model = useRef<THREE.Object3D>();
  const controls = useRef<OrbitControls>();
  const frame = useRef<number>();

  const setup = useCallback(() => {
    if (root.current) {
      const { clientWidth: width, clientHeight: height } = root.current;
      scene.current = new THREE.Scene();
      camera.current = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      camera.current.position.z = 2;
      renderer.current = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.current.setSize(width, height);
      scene.current.add(new THREE.AmbientLight());

      controls.current = new OrbitControls(
        camera.current,
        renderer.current.domElement
      );
      controls.current.enablePan = false;

      root.current.appendChild(renderer.current.domElement);
    }
  }, []);

  const load = useCallback(() => {
    if (scene.current) {
      loadSkinMesh(skin.model).then((mesh) => {
        model.current = mesh;
        scene.current!.add(model.current);
      });
    }
  }, [skin.model]);

  const animate = useCallback(() => {
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    frame.current = requestAnimationFrame(animate);
  }, []);

  const cleanup = useCallback(() => {
    if (root.current && renderer.current && frame.current) {
      root.current.removeChild(renderer.current.domElement);
      cancelAnimationFrame(frame.current);
    }
  }, []);

  useEffect(() => {
    setup();
    load();
    animate();
    return cleanup;
  }, [animate, cleanup, load, setup]);

  useEffect(() => {
    const onResize = () => {
      if (root.current && renderer.current && camera.current) {
        const { clientWidth: width, clientHeight: height } = root.current;
        renderer.current.setSize(width, height);
        camera.current.aspect = width / height;
        camera.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', onResize);
  }, []);

  return (
    <Card
      sx={{
        width: '100%',
        minHeight: '100%',
        position: 'relative',
        flex: 1,
        '& > canvas': {
          cursor: 'move',
        },
      }}
      ref={root}
    >
      {onPrev && (
        <IconButton
          size="small"
          onClick={onPrev}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      {onNext && (
        <IconButton
          size="small"
          onClick={onNext}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}

      <Stack
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          '& > img': {
            maxWidth: 50,
            maxHeight: 80,
            objectFit: 'contain',
            objectPosition: 'left',
          },
        }}
        direction="row"
        spacing={1}
      >
        <img src={skin.image} alt={skin.model} />
        <Stack>
          <Typography variant="caption">
            {skin.model} ({skin.id})
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
