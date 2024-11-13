import { baseKeymap } from '@tiptap/pm/commands'
import { keymap } from '@tiptap/pm/keymap'
import { Schema } from '@tiptap/pm/model'
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'


export const HISTORY_PLUGIN_KEY = new PluginKey('history')

export function setPluginKey(plugin: Plugin, key: PluginKey) {
	plugin.spec.key = key
	return plugin
}

export function createEditor(schema: Schema, dom: Element) {
	const state = EditorState.create({
		schema,
		plugins: [
			keymap(baseKeymap),
		],
	})
	const view = new EditorView(dom, {
		state,
		dispatchTransaction(tr) {
			const newState = view.state.apply(tr)
			view.updateState(newState)
		},
	})
	return view
}
