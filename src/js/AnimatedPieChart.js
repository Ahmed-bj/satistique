/**
 * Created by SOTUSOFT on 22/07/2017.
 */

import React  from 'react';
import AnimatedScaleWrapper  from './AnimatedScaleWrapper';
import AnimatedDataWrapper  from './AnimatedDataWrapper';
//import d3  from './d3.min';

import * as d3 from "d3";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PieChart = (_temp = _class = function (_React$Component) {
    _inherits(PieChart, _React$Component);

    function PieChart() {
        _classCallCheck(this, PieChart);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    PieChart.prototype.buildSlices = function buildSlices(data, innerRadius, outerRadius) {
        var pie = d3.pie().padAngle(0.06).sort(null);
        var labels = Object.keys(data);
        var values = labels.map(function (label) {
            return data[label];
        });
        return pie(values).map(function (point, key) {
            var arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius).cornerRadius(10);
            var d = arc(point);
            var fill = 'steelblue'; // refactor, this should be css
            var transform = 'translate(' + arc.centroid(point) + ')';
            var dy = '0.35em';
            var textAnchor = 'middle';
            return React.createElement(
                'g',
                { key: key },
                React.createElement('path', { d: d, fill: fill }),
                React.createElement(
                    'text',
                    { transform: transform, dy: dy, textAnchor: textAnchor, stroke: 'none', fill: '#fff' },
                    labels[key]
                )
            );
        });
    };

    PieChart.prototype.buildDataSeries = function buildDataSeries(data, view, margins) {
        var transform = 'translate(' + view[0] / 2 + ', ' + view[1] / 2 + ')';
        var radius = Math.min.apply(null, view) / 2;
        var innerRadius = radius * 0.125;
        var outerRadius = radius * 0.875;
        return React.createElement(
            'g',
            { transform: transform },
            this.buildSlices(data, innerRadius, outerRadius)
        );
    };

    PieChart.prototype.render = function render() {
        var _props = this.props;
        var size = _props.size;
        var margins = _props.margins;
        var data = _props.data;

        var viewBox = '0 0 ' + size[0] + ' ' + size[1];
        var transform = 'translate(' + margins[3] + ', ' + margins[0] + ')';
        var width = size[0] - margins[1] - margins[3];
        var height = size[1] - margins[0] - margins[2];
        var view = [width, height];
        return React.createElement(
            'svg',
            { viewBox: viewBox },
            React.createElement(
                'g',
                { transform: transform },
                this.buildDataSeries(data, view, margins)
            )
        );
    };

    return PieChart;
}(React.Component), _class.propTypes = {
    data: React.PropTypes.object.isRequired,
    margins: React.PropTypes.array.isRequired,
    view: React.PropTypes.array.isRequired
}, _temp);

var AnimatedPieChart = AnimatedDataWrapper('data')(PieChart);

export default AnimatedPieChart;

