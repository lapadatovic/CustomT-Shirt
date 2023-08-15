import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';

function CameraRig({ children }) {

  const group = useRef();
  const snap = useSnapshot(state);

  // useFrame hook, allows to execute code for every render frame
  useFrame((state, delta) => {

    const xlBreakpoint = window.innerWidth >=1261
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile     = window.innerWidth <=600;

    // Set the initial position of the model
    let targetPosition = [-0.3, 0, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0,0,2];
      if(xlBreakpoint) targetPosition = [-0.5,0,1];

      if(isMobile) targetPosition = [0, 0.2, 2.5];
      
    }else {
      if(isMobile) targetPosition = [0,0,2.5];
      
      if(isBreakpoint) {
        targetPosition = [0,0,1.5];
      }else {
        targetPosition = [0,0,1];
      }
    }

    // Set model camera position
    easing.damp3(state.camera.position,targetPosition,0.25,delta)


    // Set the model pozition and smoothly rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 7, state.pointer.x / 5, 0],
      0.25,
      delta
    )
  
  });


  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig