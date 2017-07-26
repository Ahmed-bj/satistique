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

var AnimatedScaleWrapper = function AnimatedScaleWrapper() {
    var scaleProps = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var transitionDuration = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];
    return function (ComposedComponent) {
        return function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class(props) {
                _classCallCheck(this, _class);

                var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

                _this.state = scaleProps.map(function (scaleProp) {
                    var _ref;

                    var scale = _this.props[scaleProp];

                    var _scale$domain = scale.domain();

                    var domainMin = _scale$domain[0];
                    var domainMax = _scale$domain[1];

                    return _ref = {}, _ref[scaleProp + 'Min'] = domainMin, _ref[scaleProp + 'Max'] = domainMax, _ref;
                }).reduce(function (prev, curr) {
                    return _extends({}, prev, curr);
                }, {});
                return _this;
            }

            _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                var _this2 = this;

                var scalesUnchanged = scaleProps.map(function (scaleProp) {
                    var _nextProps$scaleProp$ = nextProps[scaleProp].domain();

                    var nextDomainMin = _nextProps$scaleProp$[0];
                    var nextDomainMax = _nextProps$scaleProp$[1];

                    var _props$scaleProp$doma = _this2.props[scaleProp].domain();

                    var domainMin = _props$scaleProp$doma[0];
                    var domainMax = _props$scaleProp$doma[1];

                    return nextDomainMin === domainMin && nextDomainMax === domainMax;
                }).reduce(function (prev, curr) {
                    return curr && prev;
                }, true);
                if (scalesUnchanged) {
                    return;
                }
                d3.select(this).transition().tween('attr.scale', null);
                d3.select(this).transition().duration(transitionDuration).ease(d3.easeLinear).tween('attr.scale', function () {
                    var interpolators = scaleProps.map(function (scaleProp) {
                        var _nextProps$scaleProp$2 = nextProps[scaleProp].domain();

                        var nextDomainMin = _nextProps$scaleProp$2[0];
                        var nextDomainMax = _nextProps$scaleProp$2[1];

                        var minInterpolator = d3.interpolateNumber(_this2.state[scaleProp + 'Min'], nextDomainMin);
                        var maxInterpolator = d3.interpolateNumber(_this2.state[scaleProp + 'Max'], nextDomainMax);
                        return { scaleProp: scaleProp, minInterpolator: minInterpolator, maxInterpolator: maxInterpolator };
                    });
                    return function (t) {
                        var newState = interpolators.map(function (_ref2) {
                            var _ref3;

                            var scaleProp = _ref2.scaleProp;
                            var minInterpolator = _ref2.minInterpolator;
                            var maxInterpolator = _ref2.maxInterpolator;
                            return _ref3 = {}, _ref3[scaleProp + 'Min'] = minInterpolator(t), _ref3[scaleProp + 'Max'] = maxInterpolator(t), _ref3;
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

                var newScaleProps = scaleProps.map(function (scaleProp) {
                    var _ref4;

                    var scale = props[scaleProp];
                    var domainMin = state[scaleProp + 'Min'];
                    var domainMax = state[scaleProp + 'Max'];
                    var newScale = scale.copy();
                    newScale.domain([domainMin, domainMax]);
                    return _ref4 = {}, _ref4[scaleProp] = newScale, _ref4;
                }).reduce(function (prev, curr) {
                    return _extends({}, prev, curr);
                }, {});
                var newProps = _extends({}, props, newScaleProps);
                return React.createElement(ComposedComponent, newProps);
            };

            return _class;
        }(React.Component);
    };
};

export default AnimatedScaleWrapper;
