import React, { useEffect, useRef, useState } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import Spinner from "react-bootstrap/Spinner";
import SelectOptions from "./SelectOptions";
import logo from "./../logo.svg";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let currOneArray = [];
let currTwoArray = [];
let currAName;
let currBName;
let xVal = currOneArray.length + 1;
let yVal;
let yValr;

const RealtimeGraph = () => {
  const [currValueA, setCurrValueA] = useState("BTC");
  const [currValueB, setCurrValueB] = useState("LTC");
  const [currValueAPrice, setCurrValueAPrice] = useState(0);
  const [currValueBPrice, setCurrValueBPrice] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  const chart = useRef(null);

  const options = {
    legend: {
      verticalAlign: "top",
      horizontalAlign: "right",
    },
    data: [
      {
        type: "spline",
        name: currAName,
        showInLegend: true,
        dataPoints: currOneArray,
      },
      {
        type: "spline",
        name: currBName,
        showInLegend: true,
        dataPoints: currTwoArray,
      },
    ],
  };

  useEffect(() => {
	
    setCurrValueA(document.getElementById("select_one").value);
    setCurrValueB(document.getElementById("select_two").value);
    currAName = document.getElementById("select_one").value;
    currBName = document.getElementById("select_two").value;

    if (currOneArray.length === 0) {
      setDatafromApi(currValueA, currValueB);
      updateChart();
    } else {
    //   console.log(currValueAPrice, currValueBPrice);
      const interval = setInterval(() => {
        updateChart();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currValueAPrice, currValueA, currValueB, chart, isLoading]);

  const setDatafromApi = (one, two) => {
    var apirUrl =
      "https://api.nomics.com/v1/currencies/ticker?key=327c04391b7f7947e37d8f6883ddaf9d&ids=" +
      one +
      "," +
      two;
    fetch(apirUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrValueAPrice(parseInt(result["0"].price));
          setCurrValueBPrice(parseInt(result["1"].price));
          console.log(result);
        },
        (error) => {
          alert(error);
        }
      );
  };

// every second this function will run and increment the data.
  const updateChart = () => {
    let valueOne = currValueAPrice + Math.round(5 + Math.random() * (-50 - 50));
    let valueTwo = currValueBPrice + Math.round(5 + Math.random() * (-50 - 50));
    setCurrValueAPrice(valueOne);
	setCurrValueBPrice(valueTwo);
	
    yVal = parseInt(currValueAPrice);
    yValr = parseInt(currValueBPrice);
    currOneArray.push({ x: xVal, y: yVal });
    currTwoArray.push({ x: xVal, y: yValr });
    xVal++;
    if (currOneArray.length > 10) {
      currOneArray.shift();
	}
	
    if (currTwoArray.length > 10) {
      currTwoArray.shift();
	}

    if (currOneArray.length > 1){
      setIsloading(false);
    }
  };

  //   handling change event of Currency Option "A"
  const handleFirstSelect = (e) => {
    if (e.target.value === currValueB) {
      alert("Currency A and Currency B can't be same.");
    } else {
      setIsloading(true);
      setCurrValueA(e.target.value);
      console.log(currValueA);
      setDatafromApi(e.target.value, currValueB);
      xVal = 0;
      currOneArray = [];
      currTwoArray = [];
      currAName = e.target.value;
      currBName = currValueB;
      if (currOneArray.length > 1) {
        setIsloading(false);
      }
    }
  };

//   handling change event of Currency Option "B"
  const handleSecondSelect = (e) => {
    if (e.target.value === currValueA) {
      alert("Currency A and Currency B can't be same.");
    } else {
      setIsloading(true);
      setCurrValueB(e.target.value);
      setDatafromApi(currValueA, e.target.value);
      xVal = 0;
      currOneArray = [];
      currTwoArray = [];
      currAName = currValueA;
      currBName = e.target.value;
      if (currTwoArray.length > 1) {
        setIsloading(false);
      }
    }
  };

  return (
    <div>
	{/* header  :: starts */}
      <div className="nav_bar">
        <div className="heading">
          <img src={logo} alt="Bitcoin Logo" /> <h2>Real-time bitcoin graph</h2>
        </div>
        <SelectOptions events={{ handleFirstSelect, handleSecondSelect }} value={{ currAName, currBName }}
        />
      </div>
	{/* header  :: ends */}

	{/* chart  :: starts */}
      <div className="chart_wrap">
	  	{/* chart loader  :: starts */}
        <div className={`loader_wrap ${isLoading ? "" : "hide"}`}>
          <Spinner animation="grow" variant="info" />
          <br />
          <h4>Please wait while we fetch data of{" "}{currValueA + " and " + currValueB}.</h4>
        </div>
		{/* chart loader  :: ends */}
        <CanvasJSChart options={options} ref={chart} />
      </div>
	  {/* chart  :: ends */}
    </div>
  );
}

export default RealtimeGraph;
