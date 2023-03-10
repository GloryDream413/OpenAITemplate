  
import React from 'react'
import { FloatingMenu  } from '@tiptap/react'
import {
  LightBulbIcon,
} from '@heroicons/react/solid'
import NumberIcon from './NumberIcon'
import Loader from '../../Components/Loader'

import { observer } from 'mobx-react'

import { MobXProviderContext } from 'mobx-react'
function useStores() {
  return React.useContext(MobXProviderContext)
}

const ContentFloatingMenu  = ({ editor }) => {

  const { store } = useStores()

	if (!editor) {
		return null
	  }
    
  return (
	 <FloatingMenu 
        tippyOptions={{maxWidth: 600,placement: "left" }}
        editor={editor} 
        className={`${store.editor.isCountdownActive ? "hidden" : ""}`}
      >
           {store.editor.bubbleMenuLoading ? 
              <div className="px-4 py-2 transition flex justify-center text-medium bg-gray-800 text-white">
                  <Loader active className="w-6 h-6 mr-4" /> {store.editor.bubbleMenuLoading}
              </div> 
        : 
        <>
        {editor.state.selection.anchor === 1 ? 
          <>
        <div className="border rounded-lg  bg-white  flex flex-col overflow-hidden  mb-1 divide-y text-gray-600 mr-2">
                  
                  <button
                    onClick={store.editor.writeIntro}
                    className={`flex 
                    transition 
                    font-medium
                focus:bg-green-100
                focus:text-green-800
                outline-none
                    hover:bg-green-100
                    hover:text-green-800
                    px-4 py-2 `}
                  >
                    <LightBulbIcon className="w-6 h-6 mr-2 text-green-500" /> Write Introduction
                  </button>

                  <button
                    onClick={store.editor.writeIntroOutline}
                    className={`flex 
                    transition 
                    font-medium
                    focus:bg-gray-100
                    focus:text-gray-800
                    outline-none
                    hover:bg-gray-100
                    hover:text-gray-800
                    px-4 py-2 `}
                  >
                    <NumberIcon className="w-6 h-6 mr-2 text-gray-500" /> Write Outline
                  </button>
                
                  </div>
                  </> :   <div className="border rounded-lg  bg-white  flex flex-col overflow-hidden  mb-1 divide-y text-gray-600 mr-2">
                  
                  <button
                    onClick={store.editor.writeForMe}
                    className={`flex 
                    transition 
                    font-medium
                focus:bg-green-100
                focus:text-green-800
                outline-none
                    hover:bg-green-100
                    hover:text-green-800
                    px-4 py-2 `}
                  >
                    <LightBulbIcon className="w-6 h-6 mr-2 text-green-500" /> Write Sentence
                  </button>
                </div>}
        </>}
    </FloatingMenu>
  )
}

export default ContentFloatingMenu