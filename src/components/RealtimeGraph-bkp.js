import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import data from '../data';
import SelectOptions from './SelectOptions'
import logo from './../logo.svg'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dps = [{x: 1, y: 10}];   //dataPoints.
var dpr = [{x: 1, y: 5} ];   //dataPoints.
var xVal = dps.length + 1;
var xValr = dpr.length + 1;
var yVal = 15;
var yValr = 15;
var updateInterval = 1000;


class RealtimeGraph extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
		this.state = {
			items: [],
			selectOne : 'BTC',
			selectTwo: 'LTC' 
		}
	}
	componentDidMount() {
		// var ids = "BTC"
		var apirUrl = 'https://api.nomics.com/v1/currencies/ticker?key=327c04391b7f7947e37d8f6883ddaf9d&ids='+this.state.selectOne +"," + this.state.selectTwo+'&attributes=id,price,price_date,name'
		fetch(apirUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
		  });
		  console.log(this.state.items);
		  setInterval(this.updateChart, updateInterval);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
	  	
		
	}
	updateChart() {
		let yVal1 = this.state.items['0'].price;
		let yVal2 = this.state.items['1'].price;
		
		yVal = parseInt(yVal1) +  Math.round(5 + Math.random() *(-50-50));
		yValr = parseInt(yVal2) +  Math.round(5 + Math.random() *(-50-50));
		dps.push({x: xVal,y: yVal});
		dpr.push({x: xValr,y: yValr});
		xVal++;
		xValr++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		if (dpr.length >  10 ) {
			dpr.shift();
		}
		this.chart.render();
	}

	

	render() {
		
		const options = {
			data: [{
				type: "spline",
				dataPoints : dps
			},
			{
				type: "spline",
				dataPoints : dpr
			}]
		}
		
		const handleFirstSelect = (e) => {
			console.log(e.target.value)
		}
	
		const handleSecondSelect = (e) => {
			console.log(e.target.value)
		}

		return (
		<div>
		<div className="nav_bar">
			<div className="heading"><img src={logo} alt="Bitcoin Logo" /> <h2>Real-time bitcoin graph</h2></div>
				<SelectOptions events={{handleFirstSelect, handleSecondSelect}}/>
			</div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default RealtimeGraph;