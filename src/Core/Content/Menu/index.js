import React from 'react'
import { observer, inject } from 'mobx-react'
import BoldIcon from './Icons/BoldIcon'
import ItalicIcon from './Icons/ItalicIcon'
import UndoIcon from './Icons/UndoIcon'
import RedoIcon from './Icons/RedoIcon'
import CodeIcon from './Icons/CodeIcon'
import PIcon from './Icons/PIcon'
import H1Icon from './Icons/H1Icon'
import H2Icon from './Icons/H2Icon'
import H3Icon from './Icons/H3Icon'


import ShowMenuButton from './ShowMenuButton'
import WriteForMe from './WriteForMe'



import ToolTip from '../../../Components/ToolTip'

const MenuBar = observer(({ editor, store }) => {

	if (!editor) {
		return null
	  }
	
	  const { editorAiEnabled, charactersModified, bubbleMenuLoading } = store.editor
	  const characterCount = editor.getCharacterCount()
	  const wordCount = characterCount ? editor.state.doc.textContent.split(' ').length : 0
	  const timeToRead = Math.round( wordCount / 130)
  return (
	  <>
		<div className="border-b sticky top-0 bg-white z-10">
				<div className="container mx-auto max-w-3xl">
				
				<div className="p-1 divide-x flex items-center justify-center">
					<WriteForMe 
						store={store}
						 editor={editor} 
						 charactersModified={charactersModified}
						 bubbleMenuLoading={bubbleMenuLoading}
						  editorAiEnabled={editorAiEnabled} />
					<ToolTip className="inline-flex" title="Undo">
						<button
							onClick={() => editor.chain().focus().undo().run()}
							className={` rounded-md px-2 py-2 text-lg  transition hover:bg-yellow-200 text-gray-400 hover:text-yellow-600 focus:bg-yellow-500 focus:text-white`}
						>
						<UndoIcon className="w-6 h-6" />
						</button>
					</ToolTip>
					<ToolTip className="inline-flex" title="Redo">
					<button
						onClick={() => editor.chain().focus().redo().run()}
						className={`rounded-md px-2 py-2 text-lg  transition hover:bg-red-200 text-gray-400 hover:text-red-600 focus:bg-red-500 focus:text-white`}
					>
						<RedoIcon className="w-6 h-6" />
					</button>
					</ToolTip>
					{/* <ToolTip className="inline-flex" title="Regular Text">
					<button
						onClick={() => editor
							.chain()
							.focus()
							.clearNodes()
							.unsetAllMarks()
							.run()}
						className={`rounded-md px-2 py-2 text-lg  transition hover:bg-gray-200 text-gray-400 hover:text-gray-600 `}
					>
						<PIcon className="w-6 h-6"  />
					</button>
					</ToolTip>
					<ToolTip className="inline-flex" title="Heading 1">
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						className={`rounded-md px-2 py-2 text-lg  transition ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
					>
						<H1Icon className="w-6 h-6"  />
					</button>
					</ToolTip>
					<ToolTip className="inline-flex" title="Heading 2">
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						className={`rounded-md px-2 py-2 text-lg  transition ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
					>
						<H2Icon className="w-6 h-6"  />
					</button>
					</ToolTip>
					<ToolTip className="inline-flex" title="Heading 3">
					<button
						onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						className={`rounded-md px-2 py-2 text-lg  transition ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
					>
						<H3Icon className="w-6 h-6"  />
					</button>
					</ToolTip>

					<ToolTip className="inline-flex" title="Bold">
					<button
							onClick={() => editor.chain().focus().toggleBold().run()}
							className={` rounded-md px-2 py-2 text-lg  transition ${editor.isActive('bold') ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
						>
						<BoldIcon className="w-6 h-6" />
					</button>
					</ToolTip>
					<ToolTip className="inline-flex" title="Italic">
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={`rounded-md px-2 py-2 text-lg  transition ${editor.isActive('italic') ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
					>
						<ItalicIcon className="w-6 h-6" />
					</button>
					</ToolTip> */}

					{/* <ToolTip className="inline-flex" title="Code">
					<button
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						className={`rounded-md px-2 py-2 text-lg  transition ${editor.isActive('codeBlock') ? 'bg-gray-700 text-white hover:bg-gray-800' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
					>
						<CodeIcon className="w-6 h-6" />
					</button>
					</ToolTip> */}
					<ToolTip className="hidden md:inline-flex" title="Characters Written">
					<div
						
						className={`rounded-md flex px-2 items-center justify-center  transition text-gray-400 hover:text-gray-800`}
					>
						{characterCount} chars
					</div>
					</ToolTip>

					<ToolTip className="hidden md:inline-flex" title="Number of words">
					<div
						
						className={`rounded-md flex px-2 items-center justify-center  transition text-gray-400 hover:text-gray-800`}
					>
						{wordCount} words
					</div>
					</ToolTip>

					<ToolTip className="hidden md:inline-flex" title="Time to read">
					<div
						
						className={`rounded-md flex px-2 items-center justify-center  transition text-gray-400 hover:text-gray-800`}
					>
						{timeToRead} mins
					</div>
					</ToolTip>

					<ShowMenuButton />

					
					</div>
				</div>
		</div>
		</>
  )
})


export default MenuBar
