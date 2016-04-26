var React = require('react');
var ReactDOM = require('react-dom');
var assign = require('object-assign');

var Bouncefix = React.createClass({
    displayName: 'Bouncefix',
    propTypes: {
        componentClass: React.PropTypes.node,
        bumpPixels: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            componentClass: 'div',
            bumpPixels: 1
        };
    },
    scrollToEnd: function(el) {
        var curPos = el.scrollTop,
            height = el.offsetHeight,
            scroll = el.scrollHeight;

        // If at top, bump down 1px
        if(curPos <= 0) { el.scrollTop = this.props.bumpPixels; }

        // If at bottom, bump up 1px
        if(curPos + height >= scroll) {
            el.scrollTop = scroll - height - this.props.bumpPixels;
        }
    },
    onTouchStart: function(e) {
        var el = ReactDOM.findDOMNode(this);
        var isScrollable = el.scrollHeight > el.offsetHeight;

        // If scrollable, adjust
        if (isScrollable) {
            this._blockTouchMove = false;
            return this.scrollToEnd(el);
        }
        // Else block touchmove
        else {
            this._blockTouchMove = true;
        }

    },
    onTouchMove: function(e) {
        if (this._blockTouchMove) {
            e.preventDefault();
        }
    },
    onTouchEnd: function(e) {
        this._blockTouchMove = false;
    },
    render: function() {
      return React.createElement(this.props.componentClass, assign({}, this.props, {
            onTouchStart: this.onTouchStart,
            onTouchMove: this.onTouchMove,
            onTouchEnd: this.onTouchEnd,
            onTouchCancel: this.onTouchEnd
      }), this.props.children);
    }
});

module.exports = Bouncefix;
