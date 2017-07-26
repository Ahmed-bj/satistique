/**
 * Created by SOTUSOFT on 22/07/2017.
 */
'use strict';

import React  from 'react';
import AnimatedScaleWrapper  from './AnimatedScaleWrapper';
import AnimatedDataWrapper  from './AnimatedDataWrapper';
//import d3  from './d3.min';
import * as d3 from "d3";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4, _class5, _temp5;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = (_temp = _class = function (_React$Component) {
    _inherits(BarChart, _React$Component);

    function BarChart() {
        _classCallCheck(this, BarChart);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    BarChart.prototype.buildBars = function buildBars(data, view, margins, xScale, yScale) {
        return React.createElement(AnimatedBarSeries, { data: data, margins: margins, view: view, xScale: xScale, yScale: yScale });
    };

    BarChart.prototype.buildVerticalAxis = function buildVerticalAxis(view, margins, scale) {
        var orientation = VerticalAxis.orientation.LEFT;
        var tickValues = scale.ticks();
        var labelFn = function labelFn(value) {
            return value;
        };
        return React.createElement(AnimatedVerticalAxis, { scale: scale, margins: margins, view: view, tickValues: tickValues, orientation: orientation, labelFn: labelFn });
    };

    BarChart.prototype.buildLinearScale = function buildLinearScale(_ref, range) {
        var domainMin = _ref[0];
        var domainMax = _ref[1];

        return d3.scaleLinear().domain([domainMin, domainMax]).range(range);
    };

    BarChart.prototype.buildBandScale = function buildBandScale(domain, range) {
        return d3.scaleBand().domain(domain).rangeRound(range);
    };

    BarChart.prototype.buildHorizontalAxis = function buildHorizontalAxis(view, margins, scale) {
        var orientation = HorizontalAxis.orientation.BOTTOM;
        var tickValues = scale.domain();
        var labelFn = function labelFn(value) {
            return value;
        };
        return React.createElement(HorizontalAxis, { scale: scale, margins: margins, view: view, tickValues: tickValues, orientation: orientation, labelFn: labelFn });
    };

    BarChart.prototype.render = function render() {
        var _props = this.props;
        var size = _props.size;
        var margins = _props.margins;
        var data = _props.data;

        var width = size[0] - margins[1] - margins[3];
        var height = size[1] - margins[0] - margins[2];
        var view = [width, height];
        var yExtent = Object.keys(data).map(function (label) {
            return data[label];
        }).reduce(function (_ref2, curr) {
            var min = _ref2[0];
            var max = _ref2[1];
            return [Math.min(curr, min), Math.max(curr, max)];
        }, [Infinity, -Infinity]);
        var xScale = d3.scaleBand().domain(Object.keys(data).sort()).range([0, width]);
        var yScale = d3.scaleLinear().domain([0, yExtent[1]]).range([height, 0]);
        var viewBox = '0 0 ' + size[0] + ' ' + size[1];
        var transform = 'translate(' + margins[0] + ', ' + margins[3] + ')';
        return React.createElement(
            'svg',
            { viewBox: viewBox },
            React.createElement(
                'g',
                { transform: transform },
                this.buildHorizontalAxis(view, margins, xScale),
                this.buildVerticalAxis(view, margins, yScale),
                this.buildBars(data, view, margins, xScale, yScale)
            )
        );
    };

    return BarChart;
}(React.Component), _class.propTypes = {
    data: React.PropTypes.object.isRequired,
    margins: React.PropTypes.array.isRequired,
    size: React.PropTypes.array.isRequired
}, _temp);
var HorizontalAxis = (_temp2 = _class2 = function (_React$Component2) {
    _inherits(HorizontalAxis, _React$Component2);

    function HorizontalAxis() {
        _classCallCheck(this, HorizontalAxis);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    HorizontalAxis.prototype.buildTicks = function buildTicks(tickValues, scale, labelFn, orientation, margins) {
        var bandWidth = scale.bandwidth();
        return tickValues.map(function (tickValue, key) {
            var xPos = scale(tickValue) + bandWidth / 2;
            var tickLength = margins[1] / 6;
            var y2 = margins[1];
            var y1 = y2 - tickLength;
            if (orientation === HorizontalAxis.orientation.BOTTOM) {
                tickLength = margins[3] / 6;
                y2 = tickLength;
                y1 = 0;
            }
            var transform = 'translate(' + xPos + ', 0)';
            return React.createElement(
                'g',
                { transform: transform, key: key },
                React.createElement('line', _extends({ y1: y1, y2: y2 }, {
                    className: 'chart__axis-tick chart__axis-tick--horizontal',
                    x1: 0,
                    x2: 0
                })),
                React.createElement(
                    'text',
                    {
                        dy: '1.4em',
                        className: 'chart__axis-text chart__axis-text--horizontal',
                        textAnchor: 'middle',
                        x: 0,
                        y: 0
                    },
                    labelFn(tickValue)
                )
            );
        });
    };

    HorizontalAxis.prototype.render = function render() {
        var _props2 = this.props;
        var scale = _props2.scale;
        var view = _props2.view;
        var margins = _props2.margins;
        var labelFn = _props2.labelFn;
        var tickValues = _props2.tickValues;
        var orientation = _props2.orientation;
        var width = view[0];
        var height = view[1];

        var yPos = height;
        if (orientation === HorizontalAxis.orientation.TOP) {
            yPos = 0;
        }
        var transform = 'translate(0, ' + yPos + ')';
        return React.createElement(
            'g',
            { transform: transform },
            React.createElement('line', {
                className: 'chart__axis-line chart__axis-line--horizontal',
                x1: 0,
                y1: 0,
                x2: width,
                y2: 0
            }),
            this.buildTicks(tickValues, scale, labelFn, orientation, margins)
        );
    };

    return HorizontalAxis;
}(React.Component), _class2.propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired
}, _class2.orientation = {
    BOTTOM: 'horizontal-axis-bottom',
    TOP: 'horizontal-axis-top'
}, _temp2);
var VerticalAxis = (_temp3 = _class3 = function (_React$Component3) {
    _inherits(VerticalAxis, _React$Component3);

    function VerticalAxis() {
        _classCallCheck(this, VerticalAxis);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    VerticalAxis.prototype.buildTicks = function buildTicks(tickValues, scale, labelFn, margins, view, orientation) {
        return tickValues.map(function (tickValue, key) {
            var tickLength = view[0] / 6;
            var yPos = scale(tickValue);
            var x2 = view[0];
            var x1 = x2 - tickLength;
            var anchorPosition = 'end';
            var textXPos = x1 - tickLength;
            if (orientation === VerticalAxis.orientation.RIGHT) {
                x1 = 0;
                x2 = tickLength;
                anchorPosition = 'start';
            }
            var transform = 'translate(0, ' + yPos + ')';
            return React.createElement(
                'g',
                { transform: transform, key: key },
                React.createElement('line', _extends({ x1: x1, x2: x2 }, {
                    className: 'chart__axis-tick chart__axis-tick--vertical',
                    y1: 0,
                    y2: 0
                })),
                React.createElement(
                    'text',
                    {
                        dy: 3,
                        className: 'chart__axis-text chart__axis-text--vertical',
                        textAnchor: anchorPosition,
                        x: textXPos,
                        y: 0
                    },
                    labelFn(tickValue)
                )
            );
        });
    };

    VerticalAxis.prototype.render = function render() {
        var _props3 = this.props;
        var scale = _props3.scale;
        var view = _props3.view;
        var margins = _props3.margins;
        var labelFn = _props3.labelFn;
        var tickValues = _props3.tickValues;
        var orientation = _props3.orientation;

        var width = margins[3];
        var xPos = -width;
        var x1 = width;
        if (orientation === VerticalAxis.orientation.RIGHT) {
            width = margins[1]; // refactor, might be a bug here, haven't checked
            xPos = view[0];
            x1 = 0;
        }
        var x2 = x1;
        var transform = 'translate(' + xPos + ', 0)';
        return React.createElement(
            'g',
            { transform: transform },
            React.createElement('line', _extends({ x1: x1, x2: x2 }, {
                className: 'chart__axis-line chart__axis-line--vertical',
                y1: 0,
                y2: view[1]
            })),
            this.buildTicks(tickValues, scale, labelFn, orientation, margins)
        );
    };

    return VerticalAxis;
}(React.Component), _class3.propTypes = {
    labelFn: React.PropTypes.func.isRequired,
    orientation: React.PropTypes.string.isRequired,
    scale: React.PropTypes.func.isRequired,
    tickValues: React.PropTypes.array.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired
}, _class3.orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right'
}, _temp3);
var Bar = (_temp4 = _class4 = function (_React$Component4) {
    _inherits(Bar, _React$Component4);

    function Bar() {
        _classCallCheck(this, Bar);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    Bar.prototype.render = function render() {
        var _props4 = this.props;
        var fill = _props4.fill;
        var width = _props4.width;
        var yScale = _props4.yScale;
        var view = _props4.view;
        var value = _props4.value;

        var y = yScale(value);
        var height = view[1] - y;
        return React.createElement('rect', { width: width, height: height, fill: fill, y: y });
    };

    return Bar;
}(React.Component), _class4.propTypes = {
    fill: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    view: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    yScale: React.PropTypes.func.isRequired
}, _temp4);
var BarSeries = (_temp5 = _class5 = function (_React$Component5) {
    _inherits(BarSeries, _React$Component5);

    function BarSeries() {
        _classCallCheck(this, BarSeries);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    BarSeries.prototype.buildBars = function buildBars(data, view, margins, xScale, yScale) {
        var step = xScale.step();
        var width = xScale.bandwidth() - xScale.paddingInner();
        var fill = 'steelblue';
        return xScale.domain().map(function (label) {
            var value = data[label];
            var xPos = xScale(label);
            return React.createElement(
                'g',
                { transform: 'translate(' + xPos + ', 0)' },
                React.createElement(Bar, { view: view, fill: fill, width: width, yScale: yScale, value: value })
            );
        });
    };

    BarSeries.prototype.render = function render() {
        var _props5 = this.props;
        var margins = _props5.margins;
        var view = _props5.view;
        var data = _props5.data;
        var xScale = _props5.xScale;
        var yScale = _props5.yScale;
        var year = _props5.year;
        var width = view[0];
        var height = view[1];

        xScale.paddingOuter(0.125);
        xScale.paddingInner(0.125);
        var transform = 'translate(' + xScale.paddingOuter() + ', 0)';
        return React.createElement(
            'g',
            { transform: transform },
            this.buildBars(data, view, margins, xScale, yScale)
        );
    };

    return BarSeries;
}(React.Component), _class5.propTypes = {
    data: React.PropTypes.array.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired,
    xScale: React.PropTypes.func.isRequired,
    yScale: React.PropTypes.func.isRequired
}, _temp5);

var AnimatedVerticalAxis = AnimatedScaleWrapper(['scale'])(VerticalAxis);
var AnimatedBarSeries = AnimatedScaleWrapper(['yScale'])(BarSeries);
var AnimatedBarChart = AnimatedDataWrapper('data')(BarChart);

export default AnimatedBarChart;
