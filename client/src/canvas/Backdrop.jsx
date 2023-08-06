import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight,SpotLight } from '@react-three/drei'

function Backdrop() {

  const shadows = useRef()

  return (
    <AccumulativeShadows 
      ref = {shadows}
      temporal
      frames={60}
      alphaTest={0.25}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={ [0,0,-0.14] }
    >
      
      <RandomizedLight 
       amount={4}
       radius={9}
       intensity={0.55}
       ambient={0.25}
       position={ [10,5,-10] }
      />
      <RandomizedLight 
       amount={4}
       radius={5}
       intensity={0.25}
       ambient={0.55}
       position={ [-10,10,-9] }
      />
    </AccumulativeShadows>
  )
}

export default Backdrop