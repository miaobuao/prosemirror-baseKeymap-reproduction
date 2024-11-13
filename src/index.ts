import "./index.css"
import { createEditor } from "./create-editor"
import { htmlSchema } from "./schema"
import { Fragment, Schema, Slice } from "@tiptap/pm/model"
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import { EditorView } from "@tiptap/pm/view";

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
        this.view = createEditor(schema, this.editorRef.value!)
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
    editor.setSchema(htmlSchema)
    const fragment = Fragment.from(
        htmlSchema.node('paragraph', null, htmlSchema.text("abcdefghijklmno"))
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