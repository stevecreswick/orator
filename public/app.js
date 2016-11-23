webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// (File) Manifest Destiny
	
	__webpack_require__(1);
	__webpack_require__(168);

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(29);
	var MyTitle = __webpack_require__(167);
	
	var MyFirstComponent = function MyFirstComponent() {
	  return React.createElement(
	    'div',
	    null,
	    React.createElement(MyTitle, { title: 'why', color: 'rebeccapurple' }),
	    React.createElement(MyTitle, { title: 'work!', color: 'papayawhip' }),
	    React.createElement(MyTitle, { title: 'you', color: '#f06d06' })
	  );
	};
	
	ReactDOM.render(React.createElement(MyFirstComponent, null), document.getElementById('app'));

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var div = React.DOM.div;
	var h1 = React.DOM.h1;
	
	var MyTitle = React.createClass({
	  displayName: 'MyTitle',
	  render: function render() {
	    var style = { color: this.props.color };
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        { style: style },
	        this.props.title
	      )
	    );
	  }
	});
	
	module.exports = MyTitle;

/***/ },

/***/ 168:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.js.map