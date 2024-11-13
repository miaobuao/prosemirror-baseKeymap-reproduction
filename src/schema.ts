import { Schema } from '@tiptap/pm/model'

export const htmlSchema = new Schema({
	nodes: {
		doc: {
			content: 'block+',
			whitespace: 'pre',
			toDOM: () => ['div', 0],
		},
		paragraph: {
			group: 'block',
			content: 'inline*',
			whitespace: 'pre',
			toDOM: () => ['p', 0],
		},
		text: {
			group: 'inline',
			whitespace: 'pre',
			inline: true,
		},
	},
})
