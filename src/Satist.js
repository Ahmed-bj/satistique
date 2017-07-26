/**
 * Created by SOTUSOFT on 21/07/2017.
 */

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReduxThunk from 'redux-thunk';
import alea from './js/alea';
import AnimatedBarChart from './js/AnimatedBarChart';
import AnimatedPieChart from './js/AnimatedPieChart';
import * as Redux from 'redux';
import * as d3 from "d3";
import PropTypes from 'prop-types'; // ES6




const random = (() => {
    let seed = 5625463739;
    return () => alea(seed++)();
})();

const normalDist = () => {
    const halfRange = 0.5;
    const r = () => (random() + random());
    const v = [r(), r(), r()];
    const norm = (v.reduce((p, c) => { return p + c; }, 0) - v.length) / v.length;
    return norm * halfRange + halfRange;
};

function generateData (populationSize, controlSize, doNormal = false) {
    const randomFn = doNormal ? normalDist : random;
    const groups = ['React', 'JS', 'NodeJS', 'CSS', 'HTML', 'Ajax'];

    console.log("randomFn : " + randomFn + " valeur : " + (Math.floor(randomFn() * groups.length)) + " populationSize : " + populationSize);
    const baseData = d3.range(populationSize).map(() => groups[Math.floor(randomFn() * groups.length)]);

    return baseData.concat(d3.range(controlSize).map(() => 'Ruby'));
}

function countEntries (entries) {
    const tally = {};
    entries.forEach(label => {
        tally[label] = (tally[label] || 0) + 1;
    });
    return tally;
}

function configureStore (initialState) {
    const reducers = Redux.combineReducers({
        datasetSelect: datasetSelectReducer
    });
    return Redux.createStore(reducers, initialState, Redux.applyMiddleware(ReduxThunk.default));
};

function datasetSelectReducer (state = {activeDatasetIndex: 0}, action) {
    if (action.type === DatasetConstants.CHANGE_INDEX) {
        const activeDatasetIndex = action.index;
        return {...state, ...{activeDatasetIndex}};
    }
    return state;
}

const DatasetConstants = {
    CHANGE_INDEX: 'DATASET_CHANGE_INDEX'
};

const DatasetActions = {
    changeIndex: (index) => {
        return dispatch => dispatch({
            type: DatasetConstants.CHANGE_INDEX,
            index
        });
    }
};

class AppContainer extends React.Component {
    static propTypes = {
        activeDatasetIndex: React.PropTypes.number.isRequired,
        datasets: React.PropTypes.array.isRequired
    };
    /*
     <p>{'Select Dataset'}</p>
     <div className="col-sm-2">
     <DatasetSelectComponent {...{datasets, activeDatasetIndex, switchDataset}} />
     </div>
     */
    render () {
        const {datasets, activeDatasetIndex, switchDataset} = this.props;
        const data = datasets[activeDatasetIndex];
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <PieChartComponent {...{data, size: [320, 480], margins: [10, 10, 10, 10]}} />
                    </div>
                    <div className="col-sm-6">
                        <BarChartComponent {...{data, size: [480, 480], margins: [42, 42, 42, 42]}} />
                    </div>
                </div>
            </div>
        );
    }
}

AppContainer = ReactRedux.connect((state, {datasets}) => {
    const {datasetSelect: {activeDatasetIndex}} = state;
    return {
        activeDatasetIndex,
        datasets
    };
}, {
    switchDataset: DatasetActions.changeIndex
})(AppContainer);

class DatasetSelectComponent extends React.Component {
    static propTypes = {
        activeDatasetIndex: React.PropTypes.number.isRequired,
        datasets: React.PropTypes.array.isRequired,
        switchDataset: React.PropTypes.func.isRequired
    };

    onClick (datasetIndex) {
        return () => {
            this.props.switchDataset(datasetIndex);
        };
    }

    render () {
        return (
            <div>
                <form className="dataset-selector">
                    <div className="radio">
                        <label>
                            <input
                                defaultChecked
                                name="step-select"
                                onClick={this.onClick(0)}
                                type="radio"
                            /> <span className="step-select__label">{'Data A'}</span>
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                                name="step-select"
                                onClick={this.onClick(1)}
                                type="radio"
                            /> <span className="step-select__label">{'Data B'}</span>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

class BarChartComponent extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        margins:  React.PropTypes.array.isRequired,
        size: React.PropTypes.array.isRequired
    };

    render () {
        const data = countEntries(this.props.data);
        const {size, margins} = this.props;

        console.log("data : " + data );
        console.log("size : " + size );
        console.log("margins : " + margins );
        return (
            <AnimatedBarChart {...{data, size, margins}} />
        );
      /*
        return (
            <div></div>
        );
        */
    }
}

class PieChartComponent extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired,
        margins: React.PropTypes.array.isRequired,
        size: React.PropTypes.array.isRequired
    };

    render () {
        const data = countEntries(this.props.data);
        const {size, margins} = this.props;
        return (
            <AnimatedPieChart {...{data, size, margins}} />

        );
    }
}

class Satist extends React.Component {

    render () {


        const {Provider} = ReactRedux;
        const store = configureStore();
/*
        const datasets = [generateData(100, 20)];
        // const datasets = [{},{}]
        datasets.push(datasets[0].slice(0).concat(generateData(50, 0, true)));
*/


        var data = this.props.data;
        const datasets = [{},{}]
        var objects = [];
        data.map((element)=>{ var libelle = element.libelle ;  if(libelle){if(libelle != "" ){  objects.push( libelle);  }}});

        datasets[0] = objects;
        datasets[1] = objects;

        localStorage.setItem("datasets", JSON.stringify(datasets));

        if(objects.length > 0){
            return (
                <Provider store={store}>
                    <AppContainer {...{datasets}} />
                </Provider>
            );
        }else {
            return (
                <div></div>
            );
        }
    }
}

export default Satist;

/*

 class Satist extends React.Component {

 render () {

 const {Provider} = ReactRedux;
 const store = configureStore();

 const datasets = [generateData(100, 20)];
 // const datasets = [{},{}]
 datasets.push(datasets[0].slice(0).concat(generateData(50, 0, true)));


 var data = this.props.data;
 const dataset = [{},{}]

 var objects = [];


 data.map((element)=>{
 var libelle = element.libelle ;
 var prix = element.prixs ;
 var object = {libelle : prix };
 if(libelle){
 if(libelle != "" ){
 objects.push( libelle);
 }
 }
 });

 dataset[0] = objects;
 dataset[1] = objects;

 var stringData1 = datasets.map((data)=>{
 return  data.map((data)=>{
 return " , " + data.label;
 });
 });

 var stringData2 = dataset.map((data)=>{
 return  " , " + data.label;
 });

 localStorage.setItem("datasets", JSON.stringify(datasets));
 localStorage.setItem("dataset", JSON.stringify(dataset));

 Object.keys(dataset).forEach(function(key) {
 var user = dataset[key];
 console.log("description user " + key + " : " +  user);
 });


 console.log("description data 1 : " +  stringData1);
 console.log("description data 2 : " +  stringData2);

 return (
 <Provider store={store}>
 <AppContainer {...{dataset}} />
 </Provider>
 );
 }
 }

 */