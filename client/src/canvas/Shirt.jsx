import React from 'react'
import { easing } from 'maath'
import { useSnapshot} from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

function Shirt() {

  const snap = useSnapshot(state);
  // The way we are using Shirt
  const {nodes, materials} = useGLTF('/shirt_baked.glb');

  // Getting logo texture from state
  const logoTexture = useTexture(snap.logoDecal);
  // Getting the logo from state which will be on entire shirt
  const fullTexture = useTexture(snap.fullDecal);

  return (
    <group>
      <mesh
       castShadow
       geometry={nodes.T_Shirt_male.geometry}
       material={materials.lambert1}
       material-roughness={1}
       dispose={null}
      >

      </mesh>
    </group>
  )
}

export default Shirt