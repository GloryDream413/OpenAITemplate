  
import React from 'react'
import { BubbleMenu } from '@tiptap/react'
import {
	RefreshIcon,
  PencilAltIcon,
  SortAscendingIcon
} from '@heroicons/react/solid'

import Loader from '../../Components/Loader'
import Rephrase from './Rephrase'
import Grammar from './Grammar'
import Shorten from './Shorten'
import Countdown from 'react-countdown';

import { observer } from 'mobx-react'

import { MobXProviderContext } from 'mobx-react'
function useStores() {
  return React.useContext(MobXProviderContext)
}


const ContentBubbleMenu = ({ editor, store }) => {

	if (!editor) {
		return null
  }

  const { bubbleMenuLoading } = store.editor

  return (
	  <>
     
            <BubbleMenu 
              tippyOptions={{maxWidth: 600 }}
              editor={editor} 
              className={`select-none ${store.editor.isCountdownActive ? "hidden" : ""}`}
            >
            
              <div className="border border-gray-300 rounded-lg  bg-white bg-opacity-60 backdrop-filter flex flex-col md:flex-row overflow-hidden backdrop-blur-md  divide-x text-gray-600 mb-1">
              {bubbleMenuLoading ? <div className="px-4 py-2 transition flex justify-center text-medium bg-gray-800 text-white">
                <Loader active className="w-6 h-6 mr-4" /> {bubbleMenuLoading}
              </div> : <>
              <Grammar
                from={editor.state.selection.from}
                to={editor.state.selection.to}
              />
              <Rephrase
                from={editor.state.selection.from}
                to={editor.state.selection.to}
              />
              <Shorten 
              from={editor.state.selection.from}
              to={editor.state.selection.to}
              />
              </>}
          </div>
            
         </BubbleMenu>
        
    </>
  )
}

export default ContentBubbleMenu