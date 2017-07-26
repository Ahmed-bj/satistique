/**
 * Created by SOTUSOFT on 22/07/2017.
 */
'use strict';

import React  from 'react';
//import d3  from './d3.min';
import * as d3 from "d3";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedDataWrapper = function AnimatedDataWrapper(dataProp) {
    var transitionDuration = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];
    return function (ComposedComponent) {
        return function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class(props) {
                _classCallCheck(this, _class);

                var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

                var data = _this.props[dataProp];
                _this.state = Object.keys(data).map(function (label) {
                    var _ref;

                    return _ref = {}, _ref[label] = data[label], _ref;
                }).reduce(function (prev, curr) {
                    return _extends({}, prev, curr);
                }, {});
                return _this;
            }

            _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                var _this2 = this;

                var data = this.props[dataProp];
                var nextData = nextProps[dataProp];
                var dataUnchanged = Object.keys(data).map(function (label) {
                    return data[label] === nextData[label];
                }).reduce(function (prev, curr) {
                    return prev && curr;
                });
                if (dataUnchanged) {
                    return;
                }
                d3.select(this).transition().tween('attr.scale', null);
                d3.select(this).transition().duration(transitionDuration).ease(d3.easeLinear).tween('attr.scale', function () {
                    var interpolators = Object.keys(data).map(function (label) {
                        var interpolator = d3.interpolateNumber(_this2.state[label], nextData[label]);
                        return { label: label, interpolator: interpolator };
                    });
                    var interpolator = d3.interpolateNumber(_this2.state[dataProp + 'Value'], nextProps[dataProp]);
                    return function (t) {
                        var newState = interpolators.map(function (_ref2) {
                            var _ref3;

                            var label = _ref2.label;
                            var interpolator = _ref2.interpolator;
                            return _ref3 = {}, _ref3[label] = interpolator(t), _ref3;
                        }).reduce(function (prev, curr) {
                            return _extends({}, prev, curr);
                        }, {});
                        _this2.setState(newState);
                    };
                });
            };

            _class.prototype.render = function render() {
                var props = this.props;
                var state = this.state;

                var newDataProps = _extends({ data: state });
                var newProps = _extends({}, props, newDataProps);
                return React.createElement(ComposedComponent, newProps);
            };

            return _class;
        }(React.Component);
    };
};

export default AnimatedDataWrapper;