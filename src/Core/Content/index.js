import React, { Component } from 'react'
import { observer, inject,  } from 'mobx-react'

import {
    useEditor,
    EditorContent,
  } from '@tiptap/react'

  import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import Highlight from '@tiptap/extension-highlight'
// import Typography from '@tiptap/extension-typography'
import Headings from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import History from '@tiptap/extension-history'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import ContentBubbleMenu from './ContentBubbleMenu'
import ContentFloatingMenu from './ContentFloatingMenu'
import  Menu from './Menu/'
import { mergeAttributes } from '@tiptap/core'

import ContentTopic from './ContentTopic'

import {Slice, Fragment, Node} from 'prosemirror-model'



import './content.scss'

import { MobXProviderContext } from 'mobx-react'
function useStores() {
  return React.useContext(MobXProviderContext)
}

function clipboardTextParser(text, context, plain)
{
    const blocks = text.replace().split(/(?:\r\n?|\n)/);
    const nodes = [];

    blocks.forEach(line => {
        let nodeJson = {type: "paragraph"};
        if (line.length > 0) {
            nodeJson.content = [{type: "text", text: line}]
        }
        let node = Node.fromJSON(context.doc.type.schema, nodeJson);
        nodes.push(node);
    });

    const fragment = Fragment.fromArray(nodes);
    return Slice.maxOpen(fragment);
}


// import './styles.scss'

// load specific languages only

const Tiptap = observer(() => {

    const { store } = useStores()

    store.editor.editor = useEditor({
       autofocus: 'end',
        editorProps: { 
          attributes: {class: 'flex-grow mt-8 border border-gray-300 focus:outline-none', }, 
          clipboardTextParser: clipboardTextParser,
         },
        onUpdate: ({editor}) => {
          // console.log(editor.getCharacterCount())
            // store.editor.characterCounter(editor.getCharacterCount())
            // store.editor.editor.editorHtml = editor.getHTML()
        },
        onTransaction: ({editor}) => {
          // console.log(editor.getCharacterCount())
            store.editor.characterCounter(editor.getCharacterCount())
            store.editor.editorHtml = editor.getHTML()
        },
        extensions: [
          // StarterKit,
          Document,
          Paragraph.extend({
            parseHTML() {
              return [{ tag: 'div' }]
            },
            renderHTML({ HTMLAttributes }) {
              return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
            },
          }),
          Text,
          Placeholder
            .configure({
              placeholder: 'Need help starting, try the writing tools',
            }),
          Headings,
          Bold,
          CharacterCount,
          HardBreak,
          // Highlight,
          // Typography,
          History,
          Italic,
          // BulletList,
          // ListItem,
         
          // CodeBlockLowlight
          // .configure({ lowlight }),
        ],
        content: store.editor.editorHtml,
    })

    const { keywordsStatusColor } = store.editor

      return (
        <>
           <ContentTopic /> {/*   */}
            <ContentHolder store={store}>
              <Menu 
                editor={store.editor.editor} 
                store={store}
              />
              <div id="tiptap-root" className={`container mx-auto max-w-3xl `}>
                  <EditorContent 
                    editor={store.editor.editor} />
                  <ContentBubbleMenu 
                    editorMenuCountdownDate={store.editor.editorMenuCountdownDate}
                    bubbleMenuLoading={store.editor.bubbleMenuLoading}
                    editor={store.editor.editor}
                    store={store}
                    />
                  <ContentFloatingMenu 
                    editor={store.editor.editor}
                   /> 
              </div>
            </ContentHolder>
        </>
      )
    })

@inject('store')
@observer
class ContentHolder extends Component {
	render() {
		return (
			<div className={`bg-white flex flex-grow flex-col relative ${this.props.store.editor.isEditingDisabled ? "hidden" : ""}`}>
        {this.props.children}
      </div>
		)
	}
}


export default Tiptap