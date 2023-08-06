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
    let targetPositon = [-0.4, 1, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPositon = [0,0,1];
      if(xlBreakpoint) targetPositon = [-0.5,0,1];

      if(isMobile) targetPositon = [0,1.1,2];
      
    }else {
      if(isMobile) targetPositon = [0,0,2.5];

      if(isBreakpoint) {
        targetPositon = [0,0,2.5];
      }else {
        targetPositon = [0,0,1];
      }
    }

    // Set model camera position
    easing.damp3(state.camera.position,targetPositon,0.25,delta)


    // Set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
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