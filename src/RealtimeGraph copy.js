import React, { Component } from 'react';
import CanvasJSReact from './assets/canvasjs.react';
import data from './data';
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
			items: []
		}
	}
	componentDidMount() {
		fetch("https://api.nomics.com/v1/currencies/ticker?key=327c04391b7f7947e37d8f6883ddaf9d&ids=BTC,ETH,XRP&attributes=id,price,price_date,name")
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
		let yVal2 = this.state.items['2'].price;
		
		console.log(yVal2);
		yVal = parseInt(yVal1) +  Math.round(5 + Math.random() *(-50-50));
		yValr = parseInt(yVal2) +  Math.round(5 + Math.random() *(-50-50));
		dps.push({x: xVal,y: yVal});
		dpr.push({x: xValr,y: yValr});
		console.log(dps)
		console.log(dpr)
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
		
		return (
		<div>
			<h1>Real-time bitCoin graph</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default RealtimeGraph;