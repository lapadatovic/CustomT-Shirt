import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion';
import {AIPicker, ColorPicker, CustomButton, FilePicker, Tab} from '../components';


const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');

  // AI PROMPT
  const [prompt, setPrompt] = useState ('');
  const [generatingImg, setGeneratingImg] = useState(false);

  // Side editor tabs we set '' as default, but we can use 'colorpicker'
  // or filepicker, aipicker...
  const [activeEditorTab, setActiveEditorTab] = useState('');
  
  // setting as active filter logoShirt tab
  const [activeFilterTab, setActiveFilterTab] = useState ({
    logoShirt: true,
    stylishShirt: false
  })

  const handleActiveFilterTab = (tabName) => {
    switch(tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState, 
        [tabName]: !prevState[tabName]
      }
    })
  }

  // Function for reading file
  // type can be LOGO or FULLTEXTURE
  const readFile = (type) =>{
    reader(file)
     .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab('');
     })
  }

  // type can be LOGO or FULLTEXTURE
  const handleDecals = (type, result) => {
    // type can be logo or fulltexture
    const  decalType = DecalTypes[type];
    // Update state -> store/state
    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  //handleSubmit function
  const handleSubmit = async (type) => {
    if(!prompt) return alert('Please enter a prompt');

    try {
      // Call our backend to genereate an AI Image
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      });

      const data = await response.json();
      // console.log(data);
      handleDecals(type, `data:image/png;base64,${data.photo}`);

    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      // setPrompt('');
      setActiveEditorTab('');
    }
  }
  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch(activeEditorTab){
      case 'colorpicker':
        return <ColorPicker />;

      case 'filepicker':
       return <FilePicker 
                file={file}
                setFile={setFile}
                readFile={readFile}
              />;

      case 'aipicker':
        return <AIPicker 
                prompt={prompt}
                setPrompt={setPrompt}
                generatingImg={generatingImg}
                handleSubmit={handleSubmit}
              />;
      
      default: 
        return null;
    }
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Sidebar TABS */}
          <motion.div
           key="custom"
           className='absolute top-0 left-0 z-10'
           {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className='editortabs-container tabs'>
                {/* EDITOR TABS */}
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => { setActiveEditorTab(tab.name)}}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          {/*Back button */}
          <motion.div
           className='absolute z-10 top-5 right-5'
           {...fadeAnimation}
          >
            <CustomButton 
              type='filled'
              title='Go Back'
              handleClick={() => state.intro = true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>
          {/* Custom buttons */}
          <motion.div
           className='filtertabs-container'
           {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab = {activeFilterTab[tab.name]}
                    handleClick={() => {handleActiveFilterTab(tab.name)}}
                  />
                ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer