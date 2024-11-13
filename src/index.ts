import "./index.css"
import { createEditor } from "./create-editor"
import { htmlSchema } from "./schema"
import { Fragment, Slice } from "@tiptap/pm/model"

const app = document.querySelector('#root')

const editor = createEditor(htmlSchema, app!)

const fragment = Fragment.from(
    htmlSchema.node('paragraph', null, htmlSchema.text("abcdefghijklmno"))
)
const slice = new Slice(fragment, 0, 0)
const tr = editor.state.tr.replace(
    0,
    editor.state.doc.content.size,
    slice,
)
if(tr) {
    editor.dispatch(tr)
}
