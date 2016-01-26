'use strict';

// Clear codemirror variable

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _cm = undefined;

// Check for client-side rendering, used to 'upgrade' textAreas from server-side rendering
if (typeof navigator !== 'undefined') {
	_cm = require('codemirror');
}

var ReactCodeMirror = function (_React$Component) {
	_inherits(ReactCodeMirror, _React$Component);

	function ReactCodeMirror(props) {
		_classCallCheck(this, ReactCodeMirror);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCodeMirror).call(this));

		_this.state = {
			isFocused: false
		};
		return _this;
	}

	_createClass(ReactCodeMirror, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var textareaNode = this.refs.textarea;

			// Upgrade textArea node
			this.codeMirror = _cm.fromTextArea(textareaNode, this.props.options);

			// Bind CodeMirror Events and apply class methods
			this.codeMirror.on('change', this.codemirrorValueChanged);
			this.codeMirror.on('focus', this.focusChanged.bind(this, true));
			this.codeMirror.on('blur', this.focusChanged.bind(this, false));

			// Initialize and set text value
			this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
			this.codeMirror.setValue(this._currentCodemirrorValue);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			// todo: is there a lighter-weight way to remove the cm instance?
			if (this.codeMirror) this.codeMirror.toTextArea();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.codeMirror && nextProps.value !== undefined && this._currentCodemirrorValue !== nextProps.value) {
				this.codeMirror.setValue(nextProps.value);
			}
			if (_typeof(nextProps.options) === 'object') {
				for (var option in nextProps.options) {
					if (nextProps.options.hasOwnProperty(option)) {
						this.codeMirror.setOption(option, nextProps.options[key]);
					}
				}
			}
		}
	}, {
		key: 'getCodeMirror',
		value: function getCodeMirror() {
			return this.codeMirror;
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (this.codeMirror) {
				this.codeMirror.focus();
			}
		}
	}, {
		key: 'focusChanged',
		value: function focusChanged(focused) {
			this.setState({
				isFocused: focused
			});

			this.props.onFocusChange && this.props.onFocusChange(focused);
		}
	}, {
		key: 'codemirrorValueChanged',
		value: function codemirrorValueChanged(doc, change) {
			var newValue = doc.getValue();

			this._currentCodemirrorValue = newValue;
			this.props.onChange && this.props.onChange(newValue);
		}
	}, {
		key: 'render',
		value: function render() {
			// Apply class names
			var classes = 'ReactCodeMirror ' + (this.state.isFocused ? 'ReactCodeMirror--focused' : '') + ' ' + this.props.className;

			return _react2.default.createElement(
				'div',
				{ className: classes },
				_react2.default.createElement('textarea', {
					ref: 'textarea',
					name: this.props.path,
					defaultValue: this.props.value,
					autoComplete: 'off'
				})
			);
		}
	}]);

	return ReactCodeMirror;
}(_react2.default.Component);

exports.default = ReactCodeMirror;

ReactCodeMirror.propTypes = {
	onChange: _react2.default.PropTypes.func,
	onFocusChange: _react2.default.PropTypes.func,
	options: _react2.default.PropTypes.object,
	path: _react2.default.PropTypes.string,
	value: _react2.default.PropTypes.string,
	className: _react2.default.PropTypes.any
};

module.exports = ReactCodeMirror;
//# sourceMappingURL=index.js.map