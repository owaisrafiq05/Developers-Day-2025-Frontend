import { BufferGeometry, Mesh } from "three";
import { GLTF } from "three/addons";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const toSingleGeometry = (glb: GLTF): BufferGeometry => {
  /**
   * Converts a group (Such as the one returned when loading a 3D model) into a single geometry
   */
  const geometries: BufferGeometry[] = [];
  glb.scene.traverse((object3d) => {
    if (
      object3d instanceof Mesh &&
      object3d.geometry instanceof BufferGeometry
    ) {
      geometries.push(object3d.geometry);
    }
  });
  const mergedGeometry = mergeGeometries(geometries);
  return mergedGeometry;
};



export default toSingleGeometry;