import "./index.css"
import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { baseKeymap } from '@tiptap/pm/commands'
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from "@tiptap/pm/view";
import { Fragment, Schema, Slice } from "@tiptap/pm/model"
import { keymap } from '@tiptap/pm/keymap'
import {schema} from "@tiptap/pm/schema-basic"


@customElement('prose-editor')
export class ProseEditor extends LitElement {

	static styles = css`
    .editor-container > .ProseMirror {
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      &:focus-visible {
        outline: none;
      }
    }
  `

	private editorRef: Ref<HTMLDivElement> = createRef()

	render() {
		return html`<div class="editor-container" ${ref(this.editorRef)}></div> `
	}

	view?: EditorView

    setSchema(schema: Schema) {
      const state = EditorState.create({
        schema,
        plugins: [
          keymap(baseKeymap),
        ],
      })
      const view = new EditorView(this.editorRef.value!, {
        state,
        dispatchTransaction(tr) {
          const newState = view.state.apply(tr)
          view.updateState(newState)
        },
      })
      this.view = view
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "prose-editor": ProseEditor;
    }
  }

const app = document.querySelector('#root')
const editor = document.createElement('prose-editor')
app?.appendChild(editor)

setTimeout(()=>{
    editor.setSchema(schema)
    const fragment = Fragment.from(
        schema.node('paragraph', null, schema.text("abcdefghijklmno"))
    )
    const slice = new Slice(fragment, 0, 0)
    const tr = editor.view?.state.tr.replace(
        0,
        editor.view?.state.doc.content.size,
        slice,
    )
    if(tr) {
        editor.view?.dispatch(tr)
    }
})