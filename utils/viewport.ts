import SkinData from 'data/SkinData';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { DFFLoader } from './renderware/dffloader';

// TODO: This is hardcoded, but I hope it can be fixed.
// Models from this array have a strange rotation on the x-axis, causing the models to lie on the ground.
// I tried to find a property with which it would be possible to understand this, but I failed.
// Maybe something is wrong with skeletons or maybe I need to add idle-animation for the models.
// I don't know how it works in the game.
const NEED_ROTATE_X = [
  'truth',
  'bbthin',
  'bb',
  'emmet',
  'bfori',
  'dwmolc1',
  'dwmolc2',
  'swmotr1',
  'ryder3',
  'wmori',
  'dnfolc2',
  'dnmolc1',
  'suzie',
  'ryder',
  'wuzimu',
  'ryder2',
];

export async function loadSkinMesh(
  model: SkinData['model']
): Promise<THREE.Mesh> {
  const mesh = await new Promise<THREE.Mesh>((resolve) => {
    // CJ model is complicated (player.img), use OBJ loader for it.
    if (model === 'cj') {
      new MTLLoader().load(`/skins/${model}.mtl`, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(`/skins/${model}.obj`, resolve as any);
      });
    } else {
      new DFFLoader().load(`/skins/${model}.dff`, resolve);
    }
  });

  // Make skins always face the camera (Z-forward).
  if (NEED_ROTATE_X.includes(model)) {
    mesh.rotation.x = Math.PI / 2;
  } else {
    mesh.rotation.y = -Math.PI / 2;
  }

  return mesh;
}
