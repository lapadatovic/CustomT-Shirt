import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const Tab = ( {tab,isFilterTab,isActiveTab,handleClick} ) => {

  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab ? 
    {backgroundColor: snap.color, opacity: 0.5} 
    : {backgroundColor: 'transparent', opacity: 1};

  return (
    <div
     key={tab.name}
     className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'roundend-4' } `}
     onClick={handleClick}
     style={activeStyles}
    >
      <img 
       className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain' }`}
       src={tab.icon}  
       alt='logo' 
      />
    </div>
  )
}

export default Tab