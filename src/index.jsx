'use strict'

// Clear codemirror variable
let _cm = undefined

// Check for client-side rendering, used to 'upgrade' textAreas from server-side rendering
if (typeof navigator !== 'undefined') {
	_cm = require('codemirror')
}

import React from 'react'

export default class ReactCodeMirror extends React.Component {

	constructor(props) {
		super()

		this.state = {
			isFocused: false
		}
	}

	componentDidMount() {
		const textareaNode = this.refs.textarea

		// Upgrade textArea node
		this.codeMirror = _cm.fromTextArea(textareaNode, this.props.options)
		
		// Bind CodeMirror Events and apply class methods
		this.codeMirror.on('change', this.codemirrorValueChanged)
		this.codeMirror.on('focus', this.focusChanged.bind(this, true))
		this.codeMirror.on('blur', this.focusChanged.bind(this, false))
		
		// Initialize and set text value
		this._currentCodemirrorValue = this.props.defaultValue || this.props.value || ''
		this.codeMirror.setValue(this._currentCodemirrorValue)
	}

	componentWillUnmount() {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) this.codeMirror.toTextArea()
	}

	componentWillReceiveProps(nextProps) {
		if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value)
		}
		if (typeof nextProps.options === 'object') {
			for (let option in nextProps.options) {
				if (nextProps.options.hasOwnProperty(option)) {
					this.codeMirror.setOption(option, nextProps.options[key])
				}
			}
		}
	}

	getCodeMirror() {
		return this.codeMirror
	}

	focus() {
		if (this.codeMirror) {
			this.codeMirror.focus()
		}
	}

	focusChanged(focused) {
		this.setState({
			isFocused: focused
		})

		this.props.onFocusChange && this.props.onFocusChange(focused)
	}

	codemirrorValueChanged(doc, change) {
		const newValue = doc.getValue()

		this._currentCodemirrorValue = newValue
		this.props.onChange && this.props.onChange(newValue)
	}

	render() {
		// Apply class names
		const classes = `ReactCodeMirror ${this.state.isFocused ? 'ReactCodeMirror--focused' : ''} ${this.props.className}`

		return (
			<div className={ classes }>
				<textarea 
					ref='textarea'
					name={ this.props.path }
					defaultValue={ this.props.value }
					autoComplete='off'
				/>
			</div>
		)
	}
}

ReactCodeMirror.propTypes = {
	onChange: React.PropTypes.func,
	onFocusChange: React.PropTypes.func,
	options: React.PropTypes.object,
	path: React.PropTypes.string,
	value: React.PropTypes.string,
	className: React.PropTypes.any
}

module.exports = ReactCodeMirror