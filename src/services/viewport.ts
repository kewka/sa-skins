import * as THREE from 'three';
import SkinDTO from 'types/SkinDTO';

/**
 * Returns the path to the folder with the skin resources.
 * @param skin Skin.
 */
export const getSkinPath = (skin: SkinDTO) =>
  `${process.env.PUBLIC_URL}/skins/${skin.id}`;

/**
 * Returns the path to the skin material.
 * @param skin Skin.
 */
export const getSkinMaterialPath = (skin: SkinDTO) =>
  getSkinPath(skin) + `/${skin.model}.mtl`;

/**
 * Returns the path to the skin mesh.
 * @param skin Skin.
 */
export const getSkinMeshPath = (skin: SkinDTO) =>
  getSkinPath(skin) + `/${skin.model}.obj`;

/**
 * Normalizes the rotation of the root point of the skin mesh.
 * @param mesh Skin mesh.
 */
export const normalizeRoot = (mesh: THREE.Object3D) =>
  mesh.traverse(node => {
    if (node instanceof THREE.Mesh) {
      if (node.name.indexOf('Pelvis') === -1) {
        node.rotation.z = Math.PI / 2;
        node.rotation.y = Math.PI;
      } else {
        node.rotation.y = -Math.PI / 2;
      }
    }
  });

/**
 * Sets skin material properties.
 * @param material Skin material.
 */
export const configureMaterial = (material: THREE.Material) => {
  material.transparent = true;
  material.alphaTest = 0.3;
  return material;
};
